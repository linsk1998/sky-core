"use strict";

var globLib = require("./glob");
var defaultGlobs = require("../default-test-globs");

/**
 * 把命令行参数解析为测试文件列表（相对项目根目录的 posix 风格路径）。
 *
 * @param {string[]} patterns 命令行参数（必须是含路径的文件名或 glob）
 * @param {string}   [root]    项目根目录，默认 process.cwd()
 * @param {"node"|"local"} [profile] 未传参数时使用的默认范围
 *
 * 规则：
 *  - 无参数：展开对应 profile 的默认范围并排序
 *  - 有参数：作为相对项目根目录的路径或 glob（支持 * / ** / ?）
 * 任意 pattern 匹配不到文件时报错退出。
 */
function resolveTestFiles(patterns, root, profile) {
	root = root || process.cwd();
	var list = [];
	if(!patterns || !patterns.length) {
		var initial = profile && defaultGlobs[profile] ||
			[].concat(defaultGlobs.node || [], defaultGlobs.local || []);
		list = globLib.globSync(root, initial).sort();
		if(!list.length) {
			throw new Error("默认测试范围没有匹配到文件：" + initial.join(", "));
		}
		return list;
	}
	[].concat(patterns).forEach(function(pattern) {
		var norm = String(pattern).replace(/\\/g, "/");
		var matched = globLib.globSync(root, [norm]);
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
