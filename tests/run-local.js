#!/usr/bin/env node
"use strict";

/**
 * 本机浏览器测试（npm run test:local）：
 *
 *   1. rollup 编译 compat / modern / es2015 三套产物到 tests/corejs/local/，
 *      并生成一个测试页（结构同 3.html：IE 条件注释 + nomodule + module）
 *   2. 用 local-test-runner 启动静态服务器（项目根目录，/sky-core/ 前缀）
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

var fs = require("fs");
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

/** 生成测试页（结构同 tests/corejs/3.html）；缓存由服务器响应头统一禁用 */
function writeTestPage() {
	var html = [
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
		'\t<script src="./modern.js" nomodule></script>',
		'\t<script src="./es2015.js" type="module"></script>',
		'\t<!--><![endif]-->',
		'</body>',
		'',
		'</html>'
	].join("\n");
	fs.writeFileSync(path.join(process.cwd(), TEST_PAGE), html);
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
		var found = await runner.scan(conf.pattern, {
			map: function(command, version) {
				return {
					command: command,
					version: version,
					conf: conf,
					family: family
				};
			}
		});
		found.forEach(function(item) {
			// WebKit 家族：构建号 → Safari 版本，方便按 Safari 版本传参
			if(item.conf.mapVersion) {
				item.build = item.version;
				item.version = item.conf.mapVersion[item.build] || item.version;
			}
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
		// 映射过的版本带上构建号显示（如 "16.4(1735)"），便于区分
		var displayVersion = item.build && item.build !== item.version
			? item.version + "(" + item.build + ")"
			: item.version;
		var task = {
			command: item.command,
			flags: item.conf.flags ? item.conf.flags(item.command) : [],
			url: "http://" + DEFAULT_HOST + ":" + options.port + "/sky-core/" + TEST_PAGE +
				"?b=" + encodeURIComponent(item.conf.label + "-" + displayVersion),
			browser: item.conf.label,
			version: displayVersion,
			timeout: options.timeout
		};
		// preset 的 command 会被上面的绝对路径覆盖，flags 会与 preset 的合并
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

	console.log("rollup 编译 compat / modern / es2015 ...");
	await buildTests.buildLocalBundles(["compat", "modern", "es2015"], files);
	writeTestPage();

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
		// 禁缓存响应头（no-store 等）是 local-test-runner 的默认行为，无需配置
		server = await runner.serve({
			port: options.port,
			host: DEFAULT_HOST,
			root: process.cwd(),
			contextPath: "/sky-core/",
			plugins: [runner.QUnit]
		});
	} catch(err) {
		console.error("服务器启动失败：" + (err && err.message || err));
		process.exit(1);
	}

	// runQueue：单个浏览器失败/超时不中断队列，结果为 allSettled 格式
	var results;
	try {
		results = await runner.runQueue(tasks);
	} finally {
		server.close();
		console.log("服务器已关闭。");
	}

	// report：逐浏览器明细（含失败断言）+ 总计；judge：整体裁断
	console.log("");
	runner.report(results, tasks);
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
