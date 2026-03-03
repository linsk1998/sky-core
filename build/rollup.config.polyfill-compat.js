const importPlugin = require("rollup-plugin-import");
const { babel } = require("@rollup/plugin-babel");
const inject = require("@rollup/plugin-inject");
const polyfill = require("rollup-plugin-polyfill-inject");
const es3ify = require("rollup-plugin-es3ify");
const sky = require('../createRollupPlugin');

var babelRuntimePath = require.resolve("@babel/runtime/package.json", {
	paths: [process.cwd()]
});
var babelRuntimePackage = require(babelRuntimePath);
var babelRuntimeVersion = babelRuntimePackage.version;

module.exports = [{
	input: 'src/polyfill.js',
	output: {
		strict: false,
		file: 'dist/polyfill-compat.js',
		interop: false,
		format: 'iife'
	},
	context: "this",
	plugins: [
		sky('compat'),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		polyfill({
			"modules": {
				"Array.from": "sky-core/polyfill/Array/from",
				"Array.isArray": "sky-core/polyfill/Array/isArray",
				"Array.of": "sky-core/polyfill/Array/of",
				"Date": "sky-core/polyfill/Date/now",
				"Date": "sky-core/polyfill/Date/parse",
				"Date": "sky-core/polyfill/Date/constructor",
				"JSON": "sky-core/polyfill/JSON",
				"Object.assign": "sky-core/polyfill/Object/assign",
				"Object.create": "sky-core/polyfill/Object/create",
				"Object.entries": "sky-core/polyfill/Object/entries",
				"Object.fromEntries": "sky-core/polyfill/Object/fromEntries",
				"Object.hasOwn": "sky-core/polyfill/Object/hasOwn",
				"Object.getOwnPropertyDescriptor": "sky-core/polyfill/Object/getOwnPropertyDescriptor",
				"Object.getOwnPropertyDescriptors": "sky-core/polyfill/Object/getOwnPropertyDescriptors",
				"Object.getOwnPropertyNames": "sky-core/polyfill/Object/getOwnPropertyNames",
				"Object.getOwnPropertySymbols": "sky-core/polyfill/Object/getOwnPropertySymbols",
				"Object.getPrototypeOf": "sky-core/polyfill/Object/getPrototypeOf",
				"Object.is": "sky-core/polyfill/Object/is",
				"Object.keys": "sky-core/polyfill/Object/keys",
				"Object.setPrototypeOf": "sky-core/polyfill/Object/setPrototypeOf",
				"Object.values": "sky-core/polyfill/Object/values",
				"Reflect": "sky-core/polyfill/Reflect",
				"String.fromCodePoint": "sky-core/polyfill/String/fromCodePoint",
				"Map": "sky-core/polyfill/Map",
				"Promise": "sky-core/polyfill/Promise/allSettled",
				"Promise": "sky-core/polyfill/Promise/finally",
				"Promise": "sky-core/polyfill/Promise",
				"queueMicrotask": "sky-core/polyfill/queueMicrotask",
				"Set": "sky-core/polyfill/Set",
				"URL": "sky-core/polyfill/URL",
				"URLSearchParams": "sky-core/polyfill/URLSearchParams",
				"WeakMap": "sky-core/polyfill/WeakMap",
				"WeakSet": "sky-core/polyfill/WeakSet"
			},
			"include": [
				"impl/**",
				"impl-compat/**",
				"impl-modern/**",
				"utils/**",
				"utils-compat/**",
				"utils-modern/**"
			]
		}),
		babel({
			babelHelpers: 'runtime',
			babelrc: false,
			compact: false,
			plugins: [
				["@babel/plugin-transform-runtime", {
					absoluteRuntime: false,
					corejs: false,
					helpers: true,
					regenerator: true,
					useESModules: true,
					version: babelRuntimeVersion
				}],
				"@babel/plugin-transform-block-scoping",
				// ES5
				// "@babel/plugin-transform-property-mutators",
				// ES3
				// "@babel/plugin-transform-member-expression-literals",
				// "@babel/plugin-transform-property-literals",
				// "@babel/plugin-transform-reserved-words",
				// "@babel/plugin-transform-jscript"
			],
			include: [
				"impl-es2015/**/*",
			]
		}),
		es3ify()
	]
}];