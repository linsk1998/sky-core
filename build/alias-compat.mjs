
import fs from "fs";
import path from "path";

export var modules = fs.readdirSync(path.resolve(__dirname, "../modules-compat")).map(function(file) {
	var name = file.replace(/\.js$/i, "");
	return { find: "core-js/modules/" + name, replacement: path.resolve(__dirname, "../modules-compat/" + name) };
}).concat([
	{ find: "core-js/modules/esnext.global-this", replacement: path.resolve(__dirname, "../modules/es.global-this") },
	{ find: "core-js/modules", replacement: path.resolve(__dirname, "../modules") }
]);
export var utils = fs.readdirSync(path.resolve(__dirname, "../utils-compat")).map(function(file) {
	var name = file.replace(/\.js$/i, "");
	return { find: "sky-core/utils/" + name, replacement: path.resolve(__dirname, "../utils-compat/" + name) };
}).concat([
	{ find: 'sky-core/utils', replacement: path.resolve(__dirname, "../utils") },
	{ find: 'sky-core', replacement: path.resolve(__dirname, "../utils") }
]);
export var polyfills = [];
fs.readdirSync(path.resolve(__dirname, "../polyfill-compat")).forEach(findPolyfillInEachDir, "");
function findPolyfillInEachDir(file) {
	var id = this + "/" + file;
	var resolvePath = path.resolve(__dirname, "../polyfill-compat" + id);
	var stat = fs.statSync(resolvePath);
	if(stat.isDirectory()) {
		fs.readdirSync(resolvePath).forEach(findPolyfillInEachDir, id);
	} else if(file.endsWith(".js")) {
		var name = id.substring(0, id.length - 3);
		polyfills.push({ find: 'sky-core/polyfill' + name, replacement: resolvePath });
	}
}
polyfills.push(
	{ find: 'sky-core/polyfill', replacement: path.resolve(__dirname, "../polyfill") }
);
export var pures = [];
fs.readdirSync(path.resolve(__dirname, "../pure-compat")).forEach(findPureInEachDir, "");
function findPureInEachDir(file) {
	var id = this + "/" + file;
	var resolvePath = path.resolve(__dirname, "../pure-compat" + id);
	var stat = fs.statSync(resolvePath);
	if(stat.isDirectory()) {
		fs.readdirSync(resolvePath).forEach(findPureInEachDir, id);
	} else if(file.endsWith(".js")) {
		var name = id.substring(0, id.length - 3);
		pures.push({ find: 'sky-core/pure' + name, replacement: resolvePath });
	}
}
pures.push(
	{ find: 'sky-core/pure', replacement: path.resolve(__dirname, "../pure") }
);