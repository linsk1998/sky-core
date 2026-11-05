#!/usr/bin/env node
"use strict";

/**
 * 纯 node 测试（npm run test:node）——纯算法，无 tier 分层：
 *
 *   1. 解析参数得到测试文件列表（默认 tests/default-test-globs.js 的 node 数组）
 *   2. rollup 编译为内存产物（iife 字符串，不生成任何文件），
 *      注入配置来自 tests/impl-inject.js（与 conditional-*.js 同款机制，
 *      但直接映射到 impl/ 目录的算法实现，不走 tier 回退链）
 *   3. 在当前进程加载 qunitjs@1.9.0（npm 依赖，与浏览器页面引用同一份），
 *      执行产物并跑完 qunit，失败时输出明细并以非 0 码退出
 *
 * 用法：
 *   npm run test:node                                  # 默认范围（纯算法数组）
 *   npm run test:node -- es.math.sum                   # 按名称匹配
 *   npm run test:node -- tests/corejs/es/*.js          # 按 glob
 *
 * 说明：qunit 运行时用的是 qunitjs@1.9.0（devDependency），
 * 与 html 页面里引用的 node_modules/qunitjs 是同一份，保证断言语义同构。
 * 浏览器跨端测试请用 npm run test:local（有 tier 分层）。
 */

var path = require("path");
var vm = require("vm");

function usage() {
	console.log([
		"用法：node tests/run-node.js [测试文件...]",
		"",
		"测试文件：",
		"  （缺省）           使用 tests/default-test-globs.js 中的默认范围",
		"  es.array.slice     在默认范围内按名称匹配",
		'  "tests/corejs/es/*.js"  相对项目根目录的 glob（支持 * / ** / ?）',
		"",
		"  -h, --help         显示帮助"
	].join("\n"));
}

function parseArgs(argv) {
	var patterns = [];
	for(var i = 0; i < argv.length; i++) {
		var a = argv[i];
		if(a === "-h" || a === "--help") {
			usage();
			process.exit(0);
		} else {
			patterns.push(a);
		}
	}
	return patterns;
}

function fmt(value) {
	var text;
	try {
		if(value === null) {
			text = "null";
		} else if(typeof value === "object") {
			// 深度失败时 String(obj) 只会得到 "[object Object]"，给出键概要更可读
			var keys = Object.keys(value);
			text = Object.prototype.toString.call(value) +
				(keys.length ? "{" + keys.slice(0, 10).map(function(k) {
					return k + ":" + String(value[k]).slice(0, 40);
				}).join(",") + "}" : "");
		} else {
			text = String(value);
		}
	} catch(e) {
		text = "<无法字符串化>";
	}
	if(text.length > 200) {
		text = text.slice(0, 200) + "...";
	}
	return text;
}

async function run(patterns) {
	var selectTests = require("./lib/select-tests");
	var buildTests = require("./lib/build-tests");

	var files = selectTests.resolveTestFiles(patterns, undefined, "node");
	console.log("node 测试（纯算法）：共 " + files.length + " 个测试文件");

	var code = await buildTests.buildNodeBundle(files);

	// native/*.js 与部分 impl 引用 window；
	// pure/setTimeout 等按浏览器环境书写的 impl 读取 document.documentMode，
	// 给一个"非 IE、已加载完成"的最小桩（qunit 对 readyState=complete 的处理与无 document 一致）
	global.window = globalThis;
	if(typeof global.document === "undefined") {
		global.document = { readyState: "complete", documentMode: undefined };
	}

	// 与浏览器页面加载的是同一份 qunit（qunitjs@1.9.0）
	var QUnit = require("qunitjs");
	global.QUnit = QUnit;

	// 浏览器端 qunit 会 extend(window, QUnit)，把 test/asyncTest/expect/start/stop
	// 等挂成全局；CommonJS 分支跳过了这步，这里补上保持与网页端同构
	Object.keys(QUnit).forEach(function(key) {
		global[key] = QUnit[key];
	});

	return await new Promise(function(resolve) {
		var failures = [];
		var currentName = "";
		var finished = false;

		function report(result) {
			finished = true;
			var failed = result.total - result.passed;
			console.log("");
			console.log("断言 " + result.passed + "/" + result.total + " 通过，耗时 " + result.runtime + "ms");
			if(failures.length) {
				console.log("");
				console.log("失败明细：");
				failures.slice(0, 50).forEach(function(f, i) {
					console.log("  " + (i + 1) + ". [" + f.test + "] " + f.message);
					console.log("     expected: " + f.expected);
					console.log("     actual  : " + f.actual);
				});
				if(failures.length > 50) {
					console.log("  ...另有 " + (failures.length - 50) + " 条失败未显示");
				}
			}
			resolve(failed > 0 || failures.length > 0 ? 1 : 0);
		}

		QUnit.testStart(function(t) {
			currentName = (t && t.name) || "";
		});
		QUnit.log(function(details) {
			if(details && details.result === false) {
				failures.push({
					test: currentName,
					message: fmt(details.message),
					expected: fmt(details.expected),
					actual: fmt(details.actual)
				});
			}
		});
		QUnit.done(function(result) {
			// 留一个宏任务空隙，等剩余的异步回调收尾
			setTimeout(function() { report(result); }, 20);
		});

		// 产物是浏览器同款 iife：直接在本进程执行，注册测试
		QUnit.config.autorun = false;
		vm.runInThisContext(code, { filename: "sky-test-bundle.js" });

		// 相当于浏览器 load 事件：初始化并开始跑
		QUnit.load();

		// 兜底：防止有未结束的异步测试导致进程悬挂
		setTimeout(function() {
			if(!finished) {
				console.error("测试没有自然结束（可能有未 resolve 的异步测试）");
				resolve(2);
			}
		}, 10 * 60 * 1000).unref();
	});
}

function main() {
	var patterns = parseArgs(process.argv.slice(2));
	run(patterns).then(function(exitCode) {
		process.exit(exitCode);
	}, function(err) {
		console.error(err && err.stack || err);
		process.exit(1);
	});
}

main();
