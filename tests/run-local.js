#!/usr/bin/env node
"use strict";

/**
 * 本机浏览器测试（npm run test:local）：
 *
 *   1. rollup 编译 compat / modern / es2015 三套产物（内存字符串，不落盘）
 *   2. 用 local-test-runner 启动静态服务器（项目根目录，/sky-core/ 前缀），
 *      通过插件钩子提供虚拟资源：loadHtml 产生测试页（结构同 3.html：
 *      IE 条件注释 + nomodule + module），configureServer 拦截构建产物 js 请求
 *   3. 逐个浏览器打开测试页，收集 QUnit 结果（含失败明细）
 *   4. 关闭服务器；如有失败，输出明细并以非 0 码退出
 *
 * 用法：
 *   npm run test:local                                        # 全部浏览器 + 默认测试范围
 *   npm run test:local -- es.array.slice                      # 指定测试文件
 *   npm run test:local -- -b "chrome>=60,firefox"             # 指定浏览器范围
 *   npm run test:local -- -b chrome146 --timeout 180000       # 调整超时
 *
 * 浏览器范围语法见 tests/lib/local-browsers.js。
 * local-test-runner 以 npm 依赖方式引入（当前通过 pnpm link 本地接入，
 * 发布前会先把 local-test-runner 发到 npm，换成正式版本号）。
 */

var path = require("path");
var browsersLib = require("./lib/local-browsers");

var TEST_PAGE = "tests/corejs/local/index.html";
var DEFAULT_PORT = 8931;
var DEFAULT_HOST = "127.0.0.1";
var DEFAULT_TIMEOUT = 120000;

function usage() {
	console.log([
		"用法：node tests/run-local.js [测试文件...] [选项]",
		"",
		"测试文件：与 npm run test:node 相同（缺省用 tests/default-test-globs.js）",
		"",
		"选项：",
		'  -b, --browsers <specs>  浏览器范围，如 "chrome>=60,firefox,!firefox52"，缺省全部',
		"  -p, --port <n>          服务器端口，默认 " + DEFAULT_PORT,
		"  -t, --timeout <ms>      单个浏览器的启动/执行超时，默认 " + DEFAULT_TIMEOUT,
		"  -h, --help              显示帮助"
	].join("\n"));
}

function parseArgs(argv) {
	var options = { patterns: [], browsers: [], port: DEFAULT_PORT, timeout: DEFAULT_TIMEOUT };
	for(var i = 0; i < argv.length; i++) {
		var a = argv[i];
		if(a === "-b" || a === "--browsers") {
			options.browsers.push(argv[++i]);
		} else if(a.indexOf("--browsers=") === 0) {
			options.browsers.push(a.slice(a.indexOf("=") + 1));
		} else if(a === "-p" || a === "--port") {
			options.port = parseInt(argv[++i], 10);
		} else if(a === "-t" || a === "--timeout") {
			options.timeout = parseInt(argv[++i], 10);
		} else if(a === "-h" || a === "--help") {
			usage();
			process.exit(0);
		} else {
			options.patterns.push(a);
		}
	}
	return options;
}

function loadLocalTestRunner() {
	try {
		return require("local-test-runner");
	} catch(e) {
		console.error("找不到 local-test-runner 依赖（当前通过 pnpm link 本地接入，发布后为正式 npm 依赖）。");
		console.error("请先执行：pnpm link <local-test-runner 目录>");
		process.exit(1);
	}
}

/** 测试页模板（结构同 tests/corejs/3.html），完全由内存提供 */
function pageHtml() {
	return [
		'<!DOCTYPE html>',
		'<html>',
		'',
		'<head>',
		'\t<meta charset="utf-8">',
		'\t<meta http-equiv="X-UA-Compatible" content="IE=edge">',
		'\t<meta name="viewport" content="width=device-width">',
		'\t<title>sky-core Test Suite (local)</title>',
		'\t<link rel="stylesheet" href="../../../node_modules/qunitjs/qunit/qunit.css">',
		'</head>',
		'',
		'<body>',
		'\t<!--[if gte IE 9]><!-->',
		'\t<script nomodule>document.addEventListener(\'beforeload\',e=>{e.target.tagName==\'SCRIPT\'&&e.target.hasAttribute(\'nomodule\')&&e.preventDefault()},!0)</script>',
		'\t<!--><![endif]-->',
		'\t<div id="qunit"></div>',
		'\t<div id="qunit-fixture"></div>',
		'\t<script src="../../../node_modules/qunitjs/qunit/qunit.js"></script>',
		'\t<!--[if lt IE 9]><script src="./compat.js"></script><![endif]-->',
		'\t<!--[if gte IE 9]><!-->',
		'\t<script nomodule>',
		'\tif(document.onmouseenter) {',
		'\t\tdocument.write(\'<script src="./modern.js"><\\/script>\');',
		'\t} else {',
		'\t\tdocument.write(\'<script src="./legacy.js"><\\/script>\');',
		'\t}',
		'\t</script>',
		'\t<script src="./es2015.js" type="module"></script>',
		'\t<!--><![endif]-->',
		'</body>',
		'',
		'</html>'
	].join("\n");
}

/**
 * 内存资源插件（local-test-runner）：
 * - loadHtml：产生测试页 HTML（虚拟路径，不落盘；transformHtml 仍会注入结果上报脚本）
 * - configureServer：拦截三套构建产物的 js 请求，直接返回内存字符串。
 *   该中间件注册在内置响应头中间件之前，需自行补禁缓存头。
 */
function createAssetsPlugin(contextPath, bundles) {
	var pagePath = "/" + TEST_PAGE;
	var jsPrefix = contextPath + TEST_PAGE.replace(/[^/]*$/, "");
	return {
		loadHtml: function(url) {
			if(url.split("?")[0] === pagePath) {
				return pageHtml();
			}
			return null;
		},
		configureServer: function(ctx) {
			ctx.middlewares.use(function(req, res, next) {
				if(req.url.indexOf(jsPrefix) !== 0) { return next(); }
				var tier = req.url.slice(jsPrefix.length).split("?")[0].replace(/\.js$/, "");
				if(bundles[tier] == null) { return next(); }
				res.setHeader("Cache-Control", "no-store");
				res.setHeader("Pragma", "no-cache");
				res.setHeader("Expires", "0");
				res.setHeader("Content-Type", "application/javascript; charset=utf-8");
				res.end(bundles[tier]);
			});
		}
	};
}

/** 扫描选中的浏览器，生成任务列表 */
async function collectTasks(runner, options) {
	var specs = options.browsers.length
		? browsersLib.parseSpecs(options.browsers.join(","))
		: null;
	var tasks = [];
	var families = Object.keys(browsersLib.BROWSER_FAMILIES);
	for(var i = 0; i < families.length; i++) {
		var family = families[i];
		var conf = browsersLib.BROWSER_FAMILIES[family];
		var found;
		if(conf.versions) {
			// 固定版本列表的家族（如 IE 的 Edge 文档模式），不需要扫目录
			found = conf.versions.map(function(version) {
				return {
					version: version,
					conf: conf,
					family: family
				};
			});
		} else {
			found = await runner.scan(conf.pattern, {
				map: function(command, version) {
					return {
						command: command,
						version: version,
						conf: conf,
						family: family
					};
				}
			});
		}
		found.forEach(function(item) {
			// 目录名带括号的（如 Playwright(16.4)）捕获结果会包含括号，剥掉
			item.version = String(item.version).replace(/[()]/g, "");
			if(specs && !browsersLib.matchSpecs(specs, item.family, item.conf.names, item.version)) {
				return;
			}
			tasks.push(item);
		});
	}
	// 家族按配置顺序，家族内版本升序，保证执行顺序稳定
	tasks.sort(function(a, b) {
		var fa = families.indexOf(a.family);
		var fb = families.indexOf(b.family);
		if(fa !== fb) { return fa - fb; }
		return parseFloat(a.version) - parseFloat(b.version);
	});
	return tasks.map(function(item) {
		var task = {
			flags: item.conf.flags ? item.conf.flags(item.command) : [],
			url: "http://" + DEFAULT_HOST + ":" + options.port + "/sky-core/" + TEST_PAGE +
				"?b=" + encodeURIComponent(item.conf.label + "-" + item.version) +
				(item.conf.emulateIE ? "&ie=" + item.version : ""),
			browser: item.conf.label,
			version: item.version,
			timeout: options.timeout
		};
		// 扫描型家族传绝对路径 exe（覆盖 preset 的 command）；
		// 固定列表家族（IE）不传 command，完全交给 preset
		if(item.command) {
			task.command = item.command;
		}
		if(item.conf.preset) {
			task.preset = item.conf.preset;
		}
		return task;
	});
}


/** serve() 的端口占用错误是异步 error 事件，先同步探测给出友好提示 */
function checkPortFree(port) {
	var net = require("net");
	return new Promise(function(resolve, reject) {
		var probe = net.createServer();
		probe.once("error", function(err) {
			reject(new Error("端口 " + port + " 已被占用（可能上次的测试进程没退干净）：" + err.code));
		});
		probe.once("listening", function() {
			probe.close(function() { resolve(); });
		});
		probe.listen(port, DEFAULT_HOST);
	});
}

async function main() {
	var options = parseArgs(process.argv.slice(2));
	var runner = loadLocalTestRunner();
	var selectTests = require("./lib/select-tests");
	var buildTests = require("./lib/build-tests");

	var files = selectTests.resolveTestFiles(options.patterns, undefined, "local");
	console.log("本机浏览器测试：共 " + files.length + " 个测试文件");

	console.log("rollup 编译 compat / legacy / modern / es2015（内存产物，不落盘）...");
	var bundles = await buildTests.buildLocalBundlesInMemory(["compat", "legacy", "modern", "es2015"], files);
	var assetsPlugin = createAssetsPlugin("/sky-core/", bundles);

	var tasks = await collectTasks(runner, options);
	if(!tasks.length) {
		console.error("没有匹配到任何浏览器，请检查 -b 参数。");
		process.exit(1);
	}
	console.log("待测浏览器 " + tasks.length + " 个：" +
		tasks.map(function(t) { return t.browser + " " + t.version; }).join(", "));

	var server;
	try {
		await checkPortFree(options.port);
		// 禁缓存响应头（no-store 等）是 local-test-runner 的默认行为，无需配置；
		// EmulateIE 只在 URL 带 ?ie= 参数时注入 meta，对其他浏览器无影响
		server = await runner.serve({
			port: options.port,
			host: DEFAULT_HOST,
			root: process.cwd(),
			contextPath: "/sky-core/",
			plugins: [assetsPlugin, runner.QUnit, runner.EmulateIE]
		});
	} catch(err) {
		console.error("服务器启动失败：" + (err && err.message || err));
		process.exit(1);
	}

	// 执行策略：同一家族串行（runQueue），不同家族并行（Promise.allSettled），
	// 大矩阵时总耗时约等于最慢家族的串行总时长
	var labels = [];
	var groups = {};
	tasks.forEach(function(task) {
		if(!groups[task.browser]) {
			groups[task.browser] = [];
			labels.push(task.browser);
		}
		groups[task.browser].push(task);
	});
	var results;
	try {
		results = await Promise.allSettled(labels.map(function(label) {
			console.log("并行组 [" + label + "]：" + groups[label].length + " 个浏览器");
			return runner.runQueue(groups[label]);
		}));
	} finally {
		server.close();
		console.log("服务器已关闭。");
	}

	// report/judge 支持嵌套 allSettled 结果的递归扁平化；
	// 任务按组顺序拼接，与扁平化后的结果一一对应
	var orderedTasks = [];
	labels.forEach(function(label) {
		orderedTasks = orderedTasks.concat(groups[label]);
	});

	// report：逐浏览器明细（含失败断言）+ 总计；judge：整体裁断
	console.log("");
	runner.report(results, orderedTasks);
	var ok = runner.judge(results);
	console.log(ok ? "判定：通过" : "判定：未通过");

	// 强制退出（残留的浏览器子进程句柄会阻止自然退出），
	// 但先给 stdout 一点刷新时间，避免 Windows 下丢日志
	process.exitCode = ok ? 0 : 1;
	setTimeout(function() {
		process.exit(ok ? 0 : 1);
	}, 200).unref();
}

main().catch(function(err) {
	console.error(err && err.stack || err);
	process.exit(1);
});
