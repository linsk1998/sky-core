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
 * local-test-runner 未发布 npm，按目录引用：
 *   环境变量 SKY_LOCAL_TEST_RUNNER 可覆盖，默认 E:/Dev/test/local-test-runner。
 */

var fs = require("fs");
var path = require("path");
var browsersLib = require("./lib/local-browsers");
var localQUnitPlugin = require("./lib/local-qunit-plugin");

var TEST_PAGE = "tests/corejs/local/index.html";
var DEFAULT_RUNNER_DIR = "E:/Dev/test/local-test-runner";
var DEFAULT_PORT = 8931;
var DEFAULT_HOST = "127.0.0.1";
var DEFAULT_TIMEOUT = 120000;

function usage() {
	console.log([
		"用法：node tests/run-local.js [测试文件...] [选项]",
		"",
		"测试文件：与 npm test 相同（缺省用 tests/default-test-globs.js）",
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
	var dir = process.env.SKY_LOCAL_TEST_RUNNER || DEFAULT_RUNNER_DIR;
	var entry = path.resolve(dir, "dist/index.js");
	if(!fs.existsSync(entry)) {
		console.error("找不到 local-test-runner：" + entry);
		console.error("请确认本机路径，或设置环境变量 SKY_LOCAL_TEST_RUNNER 指向其目录。");
		process.exit(1);
	}
	return require(entry);
}

/** 生成测试页（结构同 tests/corejs/3.html） */
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
			if(specs && !browsersLib.matchSpecs(specs, item.family, item.version)) {
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
		var label = item.conf.label + " " + item.version;
		return {
			command: item.command,
			flags: item.conf.flags ? item.conf.flags(item.command) : [],
			url: "http://" + DEFAULT_HOST + ":" + options.port + "/sky-core/" + TEST_PAGE +
				"?b=" + encodeURIComponent(item.conf.label + "-" + item.version),
			browser: item.conf.label,
			version: item.version,
			timeout: options.timeout
		};
	});
}

function delay(ms) {
	return new Promise(function(resolve) { setTimeout(resolve, ms); });
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

function collectFailures(data) {
	var count = parseInt(data.failures, 10) || 0;
	var list = [];
	for(var i = 0; i < count && i < 50; i++) {
		if(data["fail" + i] != null) { list.push(String(data["fail" + i])); }
	}
	return list;
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
		server = await runner.serve({
			port: options.port,
			host: DEFAULT_HOST,
			root: process.cwd(),
			contextPath: "/sky-core/",
			plugins: [localQUnitPlugin]
		});
	} catch(err) {
		console.error("服务器启动失败：" + (err && err.message || err));
		process.exit(1);
	}

	var results = [];
	try {
		for(var i = 0; i < tasks.length; i++) {
			var task = tasks[i];
			try {
				var data = await runner.run(task);
				var total = parseInt(data.total, 10) || 0;
				var passed = parseInt(data.passed, 10) || 0;
				results.push({
					task: task,
					ok: passed === total && total > 0,
					total: total,
					passed: passed,
					runtime: data.runtime,
					failures: collectFailures(data)
				});
			} catch(err) {
				results.push({
					task: task,
					ok: false,
					error: String(err && err.message || err)
				});
			}
			// 给浏览器进程清理留点时间
			if(i < tasks.length - 1) { await delay(500); }
		}
	} finally {
		server.close();
		console.log("服务器已关闭。");
	}

	var bad = results.filter(function(r) { return !r.ok; });
	console.log("");
	console.log("========== 汇总 ==========");
	results.forEach(function(r) {
		var label = r.task.browser + " " + r.task.version;
		if(r.ok) {
			console.log("  [通过] " + label + "（" + r.passed + "/" + r.total + "，" + r.runtime + "ms）");
		} else if(r.error) {
			console.log("  [失败] " + label + "：" + r.error);
		} else {
			console.log("  [失败] " + label + "（" + r.passed + "/" + r.total + "，" +
				(r.total - r.passed) + " 条断言未通过）");
		}
	});
	console.log("==========================");
	console.log(results.length - bad.length + "/" + results.length + " 个浏览器通过。");

	if(bad.length) {
		console.log("");
		console.log("失败明细：");
		bad.forEach(function(r) {
			var label = r.task.browser + " " + r.task.version;
			if(r.error) {
				console.log("  [" + label + "] " + r.error);
				return;
			}
			r.failures.forEach(function(line) {
				console.log("  [" + label + "] " + line);
			});
		});
	}
	// 强制退出（残留的浏览器子进程句柄会阻止自然退出），
	// 但先给 stdout 一点刷新时间，避免 Windows 下丢日志
	var exitCode = bad.length ? 1 : 0;
	process.exitCode = exitCode;
	setTimeout(function() {
		process.exit(exitCode);
	}, 200).unref();
}

main().catch(function(err) {
	console.error(err && err.stack || err);
	process.exit(1);
});
