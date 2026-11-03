"use strict";

var fs = require("fs");
var os = require("os");
var path = require("path");

/**
 * 本机浏览器清单（按 D:\App\Browser 下的安装目录扫描）。
 * 启动参数参考 D:\App\Browser\快捷方式 里各浏览器的实际配置。
 *
 * IE 系列（IETester / VirtIE6 / LisectIE / 忽忽浏览器 / IE11-mshta）启动方式特殊，
 * 暂未接入；需要时在 BROWSER_FAMILIES 里补充 pattern 与 flags 即可。
 */

function exeDir(command) {
	return command.replace(/\\[^\\]+$/, "");
}

var FIREFOX_PREFS = [
	"user_pref(\"browser.shell.checkDefaultBrowser\", false);",
	"user_pref(\"browser.startup.homepage_override.mstone\", \"ignore\");",
	"user_pref(\"browser.sessionstore.resume_from_crash\", false);",
	"user_pref(\"app.update.enabled\", false);",
	"user_pref(\"app.update.auto\", false);",
	"user_pref(\"datareporting.policy.dataSubmissionEnabled\", false);",
	"user_pref(\"toolkit.telemetry.enabled\", false);",
	"user_pref(\"network.proxy.type\", 0);",
	"user_pref(\"dom.max_script_run_time\", 0);",
	"user_pref(\"dom.max_chrome_script_run_time\", 0);",
	"user_pref(\"dom.disable_open_during_load\", false);"
].join("\n");

var BROWSER_FAMILIES = {
	chrome: {
		label: "Chrome",
		pattern: "D:/App/Browser/Chrome/*/chrome.exe",
		flags: function(command) {
			return [
				"--user-data-dir=" + exeDir(command) + "\\Data",
				"--no-default-browser-check",
				"--no-first-run",
				"--disable-default-apps",
				"--disable-popup-blocking"
			];
		}
	},
	firefox: {
		label: "Firefox",
		pattern: "D:/App/Browser/Firefox/*/firefox.exe",
		flags: function() {
			var dir = path.join(os.tmpdir(), "sky-test-firefox-" + Date.now() + "-" +
				Math.floor(Math.random() * 100000));
			fs.mkdirSync(dir, { recursive: true });
			fs.writeFileSync(path.join(dir, "user.js"), FIREFOX_PREFS + "\n");
			return ["-no-remote", "-profile", dir];
		}
	},
	opera: {
		label: "Opera",
		pattern: "D:/App/Browser/Opera/*/opera.exe"
	},
	safari: {
		label: "Safari",
		pattern: "D:/App/Browser/Safari/Safari*/Safari.exe"
	},
	webkit: {
		label: "WebKit",
		pattern: "D:/App/Browser/Safari/WebKit_*/Playwright.exe"
	},
	webkitmini: {
		label: "WebKitMini",
		pattern: "D:/App/Browser/Safari/webkit*/MiniBrowser.exe"
	}
};

/**
 * 浏览器范围表达式：逗号分隔，每项为
 *   family               整个家族
 *   family>=v / >v / <v / <=v / ==v / =v     家族内按版本过滤（版本必须带运算符）
 *   !family[...]         排除
 * 例如：chrome>=60,firefox,!firefox=52
 */
function parseSpecs(spec) {
	return spec.split(",").map(function(item) {
		item = item.trim();
		if(!item) { return null; }
		var negate = false;
		if(item.charAt(0) === "!") {
			negate = true;
			item = item.slice(1);
		}
		// 版本必须显式带运算符，避免 "chrome146" 被误拆成 chrome + 146
		var m = item.match(/^([a-z-]+?)(>=|<=|==|>|<|=)([\d.]+)$/i) ||
			item.match(/^([a-z-]+)$/i);
		if(!m) { return null; }
		return {
			negate: negate,
			family: m[1].toLowerCase(),
			op: m[2] || null,
			version: m[3] ? parseFloat(m[3]) : null
		};
	}).filter(Boolean);
}

function compare(op, a, b) {
	switch(op) {
		case ">=": return a >= b;
		case ">": return a > b;
		case "<=": return a <= b;
		case "<": return a < b;
		case "==":
		case "=": return a === b;
		default: return true;
	}
}

/** 单个已发现浏览器是否被 specs 选中 */
function matchSpecs(specs, family, version) {
	var versionNum = parseFloat(version);
	var matched = false;
	var familyName = family.toLowerCase();
	specs.forEach(function(spec) {
		var hit = false;
		if(spec.family === "all" || spec.family === familyName ||
			(familyName.indexOf(spec.family) === 0)) {
			hit = true;
			if(spec.version !== null) {
				hit = compare(spec.op, versionNum, spec.version);
			}
		}
		if(hit) { matched = !spec.negate; }
	});
	return matched;
}

exports.BROWSER_FAMILIES = BROWSER_FAMILIES;
exports.parseSpecs = parseSpecs;
exports.matchSpecs = matchSpecs;
