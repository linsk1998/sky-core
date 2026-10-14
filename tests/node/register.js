var path = require("path");
var fs = require("fs");
var Module = require("module");

// 源码中 native/*.js 引用 window（如 native/Math.js = window.Math），
// 在 Node 下为全局补一个 window 指向 globalThis，使 polyfill 模块可加载。
if(typeof global.window === "undefined") {
	global.window = globalThis;
}

// native/*.js（顶层）用 `export var X = <expr>` 把全局对象作为命名导出，
// <expr> 形如 window.X / window.X || window.msX / this.X。
// 经 @babel/plugin-transform-modules-commonjs 转成 CJS 后会变成
// `var X = exports.X = <expr>;` —— 变量提升会遮蔽全局同名对象，导致 babel
// 注入的 `Object.defineProperty(exports, "__esModule", ...)` 访问到 undefined。
// 这些 native 全局别名模块本身无副作用、内容确定，直接用 require.cache 注入
// 等价 CJS 模块，跳过 babel 转换。
// 同步遍历 native/ 顶层所有 .js，解析 export var NAME = EXPR，在
// window/this/globalThis = globalThis 上下文中求值 EXPR，注入缓存。
var projectRoot = path.resolve(__dirname, "../../");
var nativeDir = path.resolve(projectRoot, "native");
var EXPORT_VAR_RE = /export\s+var\s+(\w+)\s*=\s*([\s\S]+?);?\s*$/;
fs.readdirSync(nativeDir, { withFileTypes: true }).forEach(function(entry) {
	if(!entry.isFile() || !entry.name.endsWith(".js")) {
		return;
	}
	var full = path.resolve(nativeDir, entry.name);
	var src = fs.readFileSync(full, "utf8");
	var m = src.match(EXPORT_VAR_RE);
	if(!m) {
		return;
	}
	var name = m[1];
	var expr = m[2];
	var value;
	try {
		value = new Function("window", "globalThis", "return (" + expr + ");")
			.call(globalThis, globalThis, globalThis);
	} catch(e) {
		// 求值失败（如该全局在当前 Node 版本不存在），退化为 undefined，
		// 与源码在该环境下的运行结果一致。
		value = undefined;
	}
	var exportsObj = { __esModule: true };
	exportsObj[name] = value;
	var fakeModule = new Module(full, null);
	fakeModule.filename = full;
	fakeModule.paths = Module._nodeModulePaths(path.dirname(full));
	fakeModule.loaded = true;
	fakeModule.exports = exportsObj;
	require.cache[full] = fakeModule;
});

// native/ 子目录文件（如 native/Object/prototype/toString.js）用 `../../X`
// 引用 native 顶层全局别名（如 native/Object.js），但该相对路径会被解析到
// 项目根而非 native/。重定向此类请求到 native/X.js。
var _resolveFilename = Module._resolveFilename;
Module._resolveFilename = function(request, parent, isMain, options) {
	if(parent && parent.filename && parent.filename.indexOf(nativeDir) === 0) {
		var m = /^\.\.\/\.\.\/([A-Za-z]\w*)$/.exec(request);
		if(m) {
			var nativeFile = path.resolve(nativeDir, m[1] + ".js");
			if(fs.existsSync(nativeFile)) {
				return nativeFile;
			}
		}
	}
	return _resolveFilename.call(this, request, parent, isMain, options);
};

// 让 mocha 能直接 require ES Module 测试文件。
// - @babel/plugin-transform-modules-commonjs：把 ESM import/export 转 CJS
// - babel-plugin-module-resolver：把 "sky-core/..." 别名解析到项目根目录
//   （与 rollup-plugin-import 在 build 时的解析规则一致）
// 其它语法保持原样，由 Node 运行时原生支持。
require("@babel/register").default({
	plugins: [
		["@babel/plugin-transform-modules-commonjs"],
		["babel-plugin-module-resolver", {
			root: [projectRoot],
			alias: {
				"sky-core": projectRoot
			}
		}]
	],
	presets: [],
	ignore: [/node_modules/],
	extensions: [".js"]
});
