"use strict";

/**
 * 本机浏览器清单（按 D:\App\Browser 下的安装目录扫描）。
 * Chrome / Firefox 的启动参数（临时 profile、防缓存、禁更新等）由
 * local-test-runner 对应的 preset 提供；其余家族直接以 exe + URL 启动。
 *
 * WebKit 家族（webkit / webkitmini）目录名只含构建号，这里维护构建号 →
 * Safari 版本的映射表，因此可以直接按 Safari 版本传参：
 *   -b safari=16.4      → WebKit_1735（Playwright 版）
 *   -b safari>=15       → 所有 Safari 15+ 的 WebKit 构建（两种都算）
 *   -b webkit=2182      → 仍可按构建号精确选择
 * safari 家族（真 Safari.exe）与 webkit 家族共享 "safari" 这个匹配名。
 *
 * IE 系列（IETester / VirtIE6 / LisectIE / 忽忽浏览器 / IE11-mshta）只做手动测试，
 * 不接入自动化；需要时在 BROWSER_FAMILIES 里补充 pattern（及 preset/flags）即可。
 */

/** WebKit 构建号 → Safari 版本（对应关系来自快捷方式的命名） */
var WEBKIT_VERSION_MAP = {
	"602": "10.0",
	"603": "10.1",
	"605": "11.0",
	"607": "12.1",
	"1269": "13.2",
	"1446": "14.2",
	"1564": "15.4",
	"1735": "16.4",
	"1921": "17.4",
	"2182": "18.5",
	"2311": "26.5"
};

var BROWSER_FAMILIES = {
	chrome: {
		label: "Chrome",
		pattern: "D:/App/Browser/Chrome/*/chrome.exe",
		preset: "Chrome"
	},
	firefox: {
		label: "Firefox",
		pattern: "D:/App/Browser/Firefox/*/firefox.exe",
		preset: "Firefox"
	},
	opera: {
		label: "Opera",
		pattern: "D:/App/Browser/Opera/*/opera.exe"
	},
	safari: {
		label: "Safari",
		pattern: "D:/App/Browser/Safari/Safari*/Safari.exe",
		names: ["safari"]
	},
	webkit: {
		label: "WebKit",
		pattern: "D:/App/Browser/Safari/WebKit_*/Playwright.exe",
		names: ["safari", "webkit"],
		mapVersion: WEBKIT_VERSION_MAP
	},
	webkitmini: {
		label: "WebKitMini",
		pattern: "D:/App/Browser/Safari/webkit*/MiniBrowser.exe",
		names: ["safari", "webkit", "webkitmini"],
		mapVersion: WEBKIT_VERSION_MAP
	}
};

/**
 * 浏览器范围表达式：逗号分隔，每项为
 *   family               整个家族（safari 会命中真 Safari 和两个 WebKit 家族）
 *   family>=v / >v / <v / <=v / ==v / =v     家族内按版本过滤（版本必须带运算符）
 *   !family[...]         排除
 * 例如：chrome>=60,firefox,!firefox=52,safari=16.4
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

/**
 * 单个已发现浏览器是否被 specs 选中。
 * @param specs    parseSpecs 结果
 * @param family   家族键名（chrome/firefox/.../webkitmini）
 * @param names    该家族响应的匹配名（含 "safari" 的家族会被 safari 规格命中）
 * @param version  用于比较的版本号（WebKit 家族为映射后的 Safari 版本）
 */
function matchSpecs(specs, family, names, version) {
	var versionNum = parseFloat(version);
	var matched = false;
	var familyName = family.toLowerCase();
	specs.forEach(function(spec) {
		var hit = false;
		if(spec.family === "all" || spec.family === familyName ||
			(names && names.indexOf(spec.family) >= 0)) {
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
