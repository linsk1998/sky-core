"use strict";

/**
 * 本机浏览器清单（按 D:\App\Browser 下的安装目录扫描）。
 * Chrome / Firefox 的启动参数（临时 profile、防缓存、禁更新等）由
 * local-test-runner 对应的 preset 提供；其余家族直接以 exe + URL 启动。
 *
 * WebKit 家族的目录名直接带 Safari 版本：MiniBrowser(10.0~12.1) 与
 * Playwright(13.2+)，无需维护映射表。-b 不提供 webkit/webkitmini 匹配名，
 * 两者只通过 safari 版本来选（版本区间天然区分两种实现）。
 *
 * IE 家族用 Edge 的 IE 模式模拟文档模式（ie=5/7/8/9/10/11）：
 * EdgeIEMode preset 启动 msedge --ie-mode-test，EmulateIE 插件按 ?ie=X 注入
 * X-UA-Compatible，条件注释按目标模式求值（ie<9 走 compat 产物，ie>=9 走 modern）。
 * IETester / VirtIE / Lisect / 忽忽浏览器等独立 IE 工具仍是手动测试。
 */

var BROWSER_FAMILIES = {
	chrome: {
		label: "Chrome",
		pattern: "D:/App/Browser/Chrome/*/chrome.exe",
		preset: "Chrome",
		names: ["chrome"]
	},
	firefox: {
		label: "Firefox",
		pattern: "D:/App/Browser/Firefox/*/firefox.exe",
		preset: "Firefox",
		names: ["firefox"],
		minVersion: 3
	},
	opera: {
		label: "Opera",
		pattern: "D:/App/Browser/Opera/*/opera.exe",
		preset: "Opera",
		names: ["opera"],
		minVersion: 9
	},
	safari: {
		label: "Safari",
		pattern: "D:/App/Browser/Safari/Safari*/Safari.exe",
		names: ["safari"]
	},
	webkit: {
		label: "WebKit",
		pattern: "D:/App/Browser/Safari/Playwright(*)/Playwright.exe",
		names: ["safari"]
	},
	webkitmini: {
		label: "WebKitMini",
		pattern: "D:/App/Browser/Safari/MiniBrowser(*)/MiniBrowser.exe",
		names: ["safari"]
	},
	ie: {
		label: "IE",
		names: ["ie"],
		// Edge IE 模式（EdgeIEMode preset + EmulateIE 插件按 ?ie=X 注入 meta），
		// 不扫目录：版本就是可模拟的 IE 文档模式
		versions: ["5", "7", "8", "9", "10", "11"],
		preset: "EdgeIEMode",
		emulateIE: true
	}
};

/**
 * 浏览器范围表达式：逗号分隔，每项为
 *   family               整个家族（safari 会命中真 Safari 和两个 WebKit 家族）
 *   family=V             精确版本（按完整版本号比较，3.5 与 3.6 区分开）
 *   family=A~B           区间：A <= v <= B
 *                        （整数边界按主版本比较，小数边界按完整版本号比较，
 *                         这样 9~13 含 13.2，而 3.5~3.6 能精确到 3.5/3.6）
 *   family=A~            下界：v >= A
 *   family=~B            上界：v <= B
 *   !family[...]         排除
 * 匹配名只有 chrome / firefox / opera / safari / ie。
 * 例如：chrome=146,firefox=60~,!firefox=52,safari=9~13,opera=9~12
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
		// 波浪号区间：family=A~B / family=A~ / family=~B
		var m = item.match(/^([a-z-]+?)(?:=([\d.]+)?~([\d.]+)?)$/i);
		if(m) {
			return {
				negate: negate,
				family: m[1].toLowerCase(),
				range: {
					min: m[2] != null ? parseFloat(m[2]) : null,
					max: m[3] != null ? parseFloat(m[3]) : null
				}
			};
		}
		// 精确版本：family=V
		m = item.match(/^([a-z-]+?)=([\d.]+)$/i);
		if(m) {
			return {
				negate: negate,
				family: m[1].toLowerCase(),
				exact: parseFloat(m[2])
			};
		}
		// 整个家族：family
		m = item.match(/^([a-z-]+)$/i);
		if(m) {
			return {
				negate: negate,
				family: m[1].toLowerCase(),
				range: null
			};
		}
		return null;
	}).filter(Boolean);
}

/** 边界是否带小数（如 3.5 / 5.1） */
function isDecimal(num) {
	return num !== Math.floor(num);
}

/**
 * 版本是否在区间内。区间语义：A~B 表示 A <= v <= B。
 * 整数边界按主版本比较（9~13 含 13.2），小数边界按完整版本号比较（3.5~3.6 排除 3.0）。
 * min/max 为 null 表示无下界/无上界。
 */
function inRange(v, range) {
	if(!range) { return true; }
	var num = parseFloat(v);
	var major = Math.floor(num);
	if(range.min != null) {
		if(isDecimal(range.min) ? num < range.min : major < range.min) { return false; }
	}
	if(range.max != null) {
		if(isDecimal(range.max) ? num > range.max : major > range.max) { return false; }
	}
	return true;
}

/**
 * 单个已发现浏览器是否被 specs 选中。完全按家族的 names 匹配，
 * 家族键名（webkit/webkitmini 等）不参与匹配。
 * @param specs    parseSpecs 结果
 * @param family   家族键名（仅用于日志）
 * @param names    该家族响应的匹配名
 * @param version  用于比较的版本号
 */
function matchSpecs(specs, family, names, version) {
	var matched = false;
	// 目录名可能是 "146.0.7633.0" 这类完整版本，取 parseFloat 得到 146
	var num = parseFloat(version);
	specs.forEach(function(spec) {
		var hit = false;
		if(spec.family === "all" || (names && names.indexOf(spec.family) >= 0)) {
			hit = spec.exact != null ? num === spec.exact : inRange(version, spec.range);
		}
		if(hit) { matched = !spec.negate; }
	});
	return matched;
}

exports.BROWSER_FAMILIES = BROWSER_FAMILIES;
exports.parseSpecs = parseSpecs;
exports.matchSpecs = matchSpecs;
