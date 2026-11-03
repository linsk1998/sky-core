"use strict";

var fs = require("fs");
var path = require("path");

/**
 * 极简 glob：只支持 * / ** / ?，足够覆盖测试文件选择。
 * 语义与常见 glob 一致：
 *   *  匹配一段内任意字符（不含 /）
 *   **  匹配任意字符（含 /）；目录位置的 ** 还允许省略整段目录
 *   ?  匹配单个非 / 字符
 */

function patternToRegExp(pattern) {
	var re = "";
	for(var i = 0; i < pattern.length; i++) {
		var c = pattern[i];
		if(c === "*") {
			if(pattern[i + 1] === "*") {
				if(pattern[i + 2] === "/") {
					re += "(?:[^/]+/)*";
					i += 2;
				} else {
					re += ".*";
					i += 1;
				}
			} else {
				re += "[^/]*";
			}
		} else if(c === "?") {
			re += "[^/]";
		} else if("\\^$.|+()[]{}".indexOf(c) >= 0) {
			re += "\\" + c;
		} else {
			re += c;
		}
	}
	return new RegExp("^" + re + "$");
}

function matchPath(relPath, pattern) {
	return patternToRegExp(pattern).test(relPath);
}

/** 取 pattern 开头的字面量目录，把扫描范围限制到最小子树 */
function literalDir(pattern) {
	var parts = pattern.split("/");
	var dirs = [];
	for(var i = 0; i < parts.length; i++) {
		if(/[*?]/.test(parts[i])) { break; }
		dirs.push(parts[i]);
	}
	return dirs.join("/");
}

var IGNORE_DIRS = { "node_modules": 1, ".git": 1, ".pnpm-store": 1, "dist": 1 };

function walk(absDir, relDir, out) {
	var entries;
	try {
		entries = fs.readdirSync(absDir, { withFileTypes: true });
	} catch(e) {
		return;
	}
	entries.forEach(function(entry) {
		var rel = relDir ? relDir + "/" + entry.name : entry.name;
		if(entry.isDirectory()) {
			if(!IGNORE_DIRS[entry.name]) {
				walk(path.join(absDir, entry.name), rel, out);
			}
		} else if(entry.isFile()) {
			out.push(rel);
		}
	});
}

/**
 * 在 root 下按 patterns 匹配文件，返回相对 root 的 posix 风格路径列表。
 */
function glob(root, patterns) {
	var out = [];
	[].concat(patterns).forEach(function(pattern) {
		// 完全字面量的文件路径：直接检查存在性
		if(!/[*?]/.test(pattern)) {
			var abs = path.resolve(root, pattern);
			if(fs.existsSync(abs) && fs.statSync(abs).isFile() && out.indexOf(pattern) < 0) {
				out.push(pattern);
			}
			return;
		}
		var prefix = literalDir(pattern);
		var base = path.resolve(root, prefix || ".");
		var files = [];
		walk(base, prefix, files);
		var regex = patternToRegExp(pattern);
		files.forEach(function(rel) {
			if(regex.test(rel) && out.indexOf(rel) < 0) {
				out.push(rel);
			}
		});
	});
	return out;
}

exports.glob = glob;
exports.matchPath = matchPath;
