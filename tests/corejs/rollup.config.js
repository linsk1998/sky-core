
const path = require("path");
const { babel } = require("@rollup/plugin-babel");
const importPlugin = require("rollup-plugin-import");
const nodeResolve = require("@rollup/plugin-node-resolve");
const sky = require("../../createRollupPlugin");

var babelRuntimePath = require.resolve("@babel/runtime/package.json", {
	paths: [process.cwd()]
});
var babelRuntimePackage = require(babelRuntimePath);
var babelRuntimeVersion = babelRuntimePackage.version;
module.exports = [{
	input: 'tests/corejs/index.js',
	output: {
		strict: false,
		file: 'docs/tests/corejs/compat.js',
		format: 'iife'
	},
	treeshake: false,
	plugins: [
		sky('compat'),
		nodeResolve(),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		...require("../conditional-compat"),
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
				// "@babel/plugin-transform-property-mutators",
				// ES3
				// "@babel/plugin-transform-member-expression-literals",
				// "@babel/plugin-transform-property-literals",
				// "@babel/plugin-transform-reserved-words",
				// "@babel/plugin-transform-jscript"
			],
			include: [
				"tests/corejs/**/*",
			]
		}),
		babel({
			babelHelpers: 'bundled',
			babelrc: false,
			compact: false,
			plugins: [
				"@babel/plugin-transform-member-expression-literals",
				"@babel/plugin-transform-property-literals",
				"@babel/plugin-transform-reserved-words",
				"@babel/plugin-transform-jscript"
			]
		}),
	]
}, {
	input: 'tests/corejs/index.js',
	output: {
		strict: false,
		file: 'docs/tests/corejs/modern.js',
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
		...require("../conditional-modern"),
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
				"tests/corejs/**/*",
			]
		}),
	]
}, {
	input: 'tests/corejs/index.js',
	output: {
		strict: false,
		file: 'docs/tests/corejs/es2015.js',
		format: 'iife'
	},
	treeshake: false,
	plugins: [
		sky('es2015'),
		nodeResolve(),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		...require("../conditional-es2015"),
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
				"@babel/plugin-transform-optional-catch-binding"
			],
			include: [
				"tests/corejs/**/*",
			]
		}),
	]
}];