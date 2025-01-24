
const { babel } = require("@rollup/plugin-babel");
const nodeResolve = require("@rollup/plugin-node-resolve");
const importPlugin = require("rollup-plugin-import");
const polyfill = require("rollup-plugin-polyfill-inject");
const sky = require("../../createRollupPlugin");

module.exports = {
	input: 'tests/ie8/polyfill.es',
	output: {
		strict: true,
		file: 'tests/ie8/polyfill.js',
		format: 'iife'
	},
	plugins: [
		sky('compat'),
		nodeResolve(),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		polyfill({
			modules: {
				".indexOf": "sky-core/polyfill/Array/prototype/indexOf",
				".lastIndexOf": "sky-core/polyfill/Array/prototype/lastIndexOf",
				".forEach": "sky-core/polyfill/Array/prototype/forEach",
				".filter": "sky-core/polyfill/Array/prototype/filter",
				".map": "sky-core/polyfill/Array/prototype/map",
				".some": "sky-core/polyfill/Array/prototype/some",
				".every": "sky-core/polyfill/Array/prototype/every",
			},
			exclude: [
				"native/**/*",
				"polyfill/**/*",
				"polyfill-compat/**/*",
				"polyfill-modern/**/*",
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
		})
	]
};