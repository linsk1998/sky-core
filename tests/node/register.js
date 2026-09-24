var path = require("path");
var Module = require("module");

// 源码中 native/*.js 引用 window（如 native/Math.js = window.Math），
// 在 Node 下为全局补一个 window 指向 globalThis，使 polyfill 模块可加载。
if(typeof global.window === "undefined") {
	global.window = globalThis;
}

// native/{Object,Symbol,Math,...}.js 用 `export var X = window.X` 把全局对象
// 作为命名导出。经 @babel/plugin-transform-modules-commonjs 转成 CJS 后会变成
// `var X = exports.X = window.X;` —— 变量提升会遮蔽全局同名对象，导致 babel
// 注入的 `Object.defineProperty(exports, "__esModule", ...)` 访问到 undefined。
// 这些 native 全局别名模块本身无副作用、内容确定，直接用 require.cache 注入
// 等价 CJS 模块，跳过 babel 转换。
var NATIVE_GLOBAL_ALIASES = {
	"native/Object.js": { Object: globalThis.Object },
	"native/Symbol.js": { Symbol: globalThis.Symbol },
	"native/Math.js": { Math: globalThis.Math },
	"native/Array.js": { Array: globalThis.Array },
	"native/Function.js": { Function: globalThis.Function },
	"native/Number.js": { Number: globalThis.Number },
	"native/String.js": { String: globalThis.String },
	"native/Boolean.js": { Boolean: globalThis.Boolean },
	"native/Date.js": { Date: globalThis.Date },
	"native/RegExp.js": { RegExp: globalThis.RegExp },
	"native/Error.js": { Error: globalThis.Error },
	"native/JSON.js": { JSON: globalThis.JSON },
	"native/Promise.js": { Promise: globalThis.Promise }
};
var projectRoot = path.resolve(__dirname, "../../");
Object.keys(NATIVE_GLOBAL_ALIASES).forEach(function(relPath) {
	var full = path.resolve(projectRoot, relPath);
	var ns = NATIVE_GLOBAL_ALIASES[relPath];
	var fakeModule = new Module(full, null);
	fakeModule.filename = full;
	fakeModule.paths = Module._nodeModulePaths(path.dirname(full));
	fakeModule.loaded = true;
	fakeModule.exports = Object.assign({ __esModule: true }, ns);
	require.cache[full] = fakeModule;
});

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
