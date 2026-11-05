"use strict";

var path = require("path");
var tinyglobby = require("tinyglobby");
var picomatch = require("picomatch");

/**
 * 在 root 下按 patterns 匹配文件，返回相对 root 的 posix 风格路径列表。
 * 使用 tinyglobby（与 local-test-runner 同款）做文件遍历与匹配。
 */
function globSync(root, patterns) {
	var list = [].concat(patterns);
	var out = [];
	var seen = {};

	// 字面量文件路径（不含通配符）直接检查存在性
	var literal = list.filter(function(p) { return !/[*?]/.test(p); });
	var wildcard = list.filter(function(p) { return /[*?]/.test(p); });

	literal.forEach(function(rel) {
		var abs = path.resolve(root, rel);
		try {
			if(require("fs").statSync(abs).isFile() && !seen[rel]) {
				seen[rel] = true;
				out.push(rel.replace(/\\/g, "/"));
			}
		} catch(e) { /* 不存在，跳过 */ }
	});

	if(wildcard.length) {
		var files = tinyglobby.globSync(wildcard, {
			cwd: root,
			absolute: false,
			dot: false
		});
		files.forEach(function(rel) {
			var posix = rel.replace(/\\/g, "/");
			if(!seen[posix]) {
				seen[posix] = true;
				out.push(posix);
			}
		});
	}

	return out;
}

/** 单个路径是否匹配某个 pattern（picomatch，与 rollup pluginutils 同款匹配器） */
function matchPath(relPath, pattern) {
	return picomatch.isMatch(relPath, pattern, { dot: false });
}

exports.globSync = globSync;
exports.matchPath = matchPath;
