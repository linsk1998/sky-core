"use strict";

var globLib = require("./glob");
var defaultGlobs = require("../default-test-globs");

/**
 * 裸名称匹配（不带 / 也不以 .js 结尾时），在默认测试范围内查找：
 *   es.array.slice      → tests/corejs/es/es.array.slice.js
 *   es.math.sign        → tests/corejs/es/es.math.sign.js
 *   es.math.sum-precise → tests/corejs/pure/es.math.sum-precise.js
 *   array.slice*        → 通配（按任意目录下的 <token>*.js 匹配）
 *
 * 查找空间是 node + local 两个 profile 的并集，
 * 这样 `npm run test:node -- es.array.slice` 也能直接引用浏览器侧的测试。
 */
function matchBare(relPath, token) {
	if(/[*?]/.test(token)) {
		return globLib.matchPath(relPath, "**\/" + token + ".js") ||
			globLib.matchPath(relPath, "**\/" + token);
	}
	var noExt = relPath.replace(/\.js$/, "");
	var base = noExt.slice(noExt.lastIndexOf("/") + 1);
	return noExt === token ||
		noExt.slice(-("/" + token).length) === "/" + token ||
		noExt.slice(0, token.length + 1) === token + "/" ||
		noExt.indexOf("/" + token + "/") >= 0 ||
		base.slice(0, token.length) === token ||
		base.slice(-token.length) === token;
}

/**
 * 把命令行参数解析为测试文件列表（相对项目根目录的 posix 风格路径）。
 *
 * @param {string[]} patterns 命令行参数
 * @param {string}   [root]    项目根目录，默认 process.cwd()
 * @param {"node"|"local"} [profile] 未传参数时使用的默认范围
 *
 * 规则：
 *  - 无参数：展开对应 profile 的默认范围并排序
 *  - 含 / 或通配符：作为相对项目根目录的 glob
 *  - 其他：在 node + local 默认范围的并集里按名称匹配
 * 任意 pattern 匹配不到文件时报错退出。
 */
function resolveTestFiles(patterns, root, profile) {
	root = root || process.cwd();
	var defaults = [].concat(
		defaultGlobs.node || [],
		defaultGlobs.local || []
	);
	var list = [];
	if(!patterns || !patterns.length) {
		var initial = profile && defaultGlobs[profile] || defaults;
		list = globLib.globSync(root, initial).sort();
		if(!list.length) {
			throw new Error("默认测试范围没有匹配到文件：" + initial.join(", "));
		}
		return list;
	}
	[].concat(patterns).forEach(function(pattern) {
		var norm = String(pattern).replace(/\\/g, "/");
		var matched;
		if(norm.indexOf("/") >= 0) {
			matched = globLib.globSync(root, [norm]);
		} else {
			matched = globLib.globSync(root, defaults).filter(function(rel) {
				return matchBare(rel, norm);
			});
		}
		if(!matched.length) {
			throw new Error("没有匹配到测试文件：" + pattern);
		}
		matched.forEach(function(rel) {
			if(list.indexOf(rel) < 0) {
				list.push(rel);
			}
		});
	});
	return list;
}

exports.resolveTestFiles = resolveTestFiles;
exports.defaultGlobs = defaultGlobs;
