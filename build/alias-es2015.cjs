
const fs = require("fs");
const path = require("path");

exports.modules = fs.readdirSync(path.resolve(__dirname, "../modules-modern")).map(function(file) {
	var name = file.replace(/\.js$/i, "");
	return { find: "core-js/modules/" + name, replacement: path.resolve(__dirname, "../modules-modern/" + name) };
}).concat([
	{ find: "core-js/modules/esnext.global-this", replacement: path.resolve(__dirname, "../modules/es.global-this") },
	{ find: "core-js/modules", replacement: path.resolve(__dirname, "../modules") }
]);
exports.utils = fs.readdirSync(path.resolve(__dirname, "../utils-es2015")).map(function(file) {
	var name = file.replace(/\.js$/i, "");
	return { find: "sky-core/utils/" + name, replacement: path.resolve(__dirname, "../utils-es2015/" + name) };
}).concat(fs.readdirSync(path.resolve(__dirname, "../utils-modern")).map(function(file) {
	var name = file.replace(/\.js$/i, "");
	return { find: "sky-core/utils/" + name, replacement: path.resolve(__dirname, "../utils-modern/" + name) };
})).concat([
	{ find: 'sky-core/utils', replacement: path.resolve(__dirname, "../utils") },
	{ find: 'sky-core', replacement: path.resolve(__dirname, "../utils") }
]);
var polyfills = [];
fs.readdirSync(path.resolve(__dirname, "../polyfill-modern")).forEach(findPolyfillInEachDir, "");
function findPolyfillInEachDir(file) {
	var id = this + "/" + file;
	var resolvePath = path.resolve(__dirname, "../polyfill-modern" + id);
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
exports.polyfills = polyfills;
var pures = [];
fs.readdirSync(path.resolve(__dirname, "../pure-modern")).forEach(findPureInEachDir, "");
function findPureInEachDir(file) {
	var id = this + "/" + file;
	var resolvePath = path.resolve(__dirname, "../pure-modern" + id);
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
exports.pures = pures;