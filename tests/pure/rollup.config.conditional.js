
const path = require("path");
const { babel } = require("@rollup/plugin-babel");
const importPlugin = require("rollup-plugin-import");
const nodeResolve = require("@rollup/plugin-node-resolve");
const inject = require("@rollup/plugin-inject");
const polyfill = require("rollup-plugin-polyfill-inject");
const sky = require("../../createRollupPlugin");

var babelRuntimePath = require.resolve("@babel/runtime/package.json", {
	paths: [process.cwd()]
});
var babelRuntimePackage = require(babelRuntimePath);
var babelRuntimeVersion = babelRuntimePackage.version;

module.exports = [{
	input: 'tests/pure/unit/index.js',
	output: {
		strict: false,
		file: 'tests/pure/conditional/modern.js',
		format: 'iife'
	},
	treeshake: false,
	plugins: [
		sky('modern'),
		nodeResolve(),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		polyfill({
			modules: {
				".at": "sky-core/polyfill/Array/prototype/at",
				"Math.trunc": "sky-core/polyfill/Math/trunc",
				"Number.isInteger": "sky-core/polyfill/Number/isInteger",
				"Object.defineProperty": "sky-core/polyfill/Object/defineProperty",
			},
		}),
		inject({
			modules: {
				"Reflect.construct": "sky-core/pure/Reflect/construct",
				"Reflect.get": "sky-core/pure/Reflect/get",
				"Reflect.set": "sky-core/pure/Reflect/set",
				"Proxy": "sky-core/pure/Proxy",
				"Proxy.revocable": "sky-core/pure/Proxy/revocable",
			},
			include: [
				"impl/**/*",
				"impl-compat/**/*",
				"impl-modern/**/*",
				"tests/pure/unit/*",
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
				// ES2019
				"@babel/plugin-transform-optional-catch-binding",
				"@babel/plugin-transform-json-strings",
				// ES2018
				"@babel/plugin-transform-async-generator-functions",
				// "@babel/plugin-transform-dotall-regex"
				"@babel/plugin-transform-named-capturing-groups-regex",
				["@babel/plugin-transform-object-rest-spread", { loose: true, "useBuiltIns": true }],
				// "@babel/plugin-transform-unicode-property-regex"
				// ES2017
				// "@babel/plugin-transform-async-to-generator",
				// ES2016
				"@babel/plugin-transform-exponentiation-operator",
				// ES2015
				// "@babel/plugin-transform-regenerator",
				"@babel/plugin-transform-arrow-functions",
				// "@babel/plugin-transform-block-scoped-functions",
				"@babel/plugin-transform-block-scoping",
				["@babel/plugin-transform-classes", { loose: true }],
				["@babel/plugin-transform-computed-properties", { loose: true }],
				["@babel/plugin-transform-destructuring", { loose: true, "useBuiltIns": true }],
				"@babel/plugin-transform-duplicate-keys",
				["@babel/plugin-transform-for-of", { loose: true }],
				// "@babel/plugin-transform-instanceof",
				"@babel/plugin-transform-literals",
				"@babel/plugin-transform-new-target",
				// "@babel/plugin-transform-object-super",
				["@babel/plugin-transform-parameters", { loose: true }],
				"@babel/plugin-transform-shorthand-properties",
				["@babel/plugin-transform-spread", { loose: true }],
				// "@babel/plugin-transform-sticky-regex",
				["@babel/plugin-transform-template-literals", { loose: true }],
				"@babel/plugin-transform-typeof-symbol",
				// ES5
				// "@babel/plugin-transform-property-mutators"
			],
			include: [
				"tests/pure/unit/*",
			]
		}),
	]
}];