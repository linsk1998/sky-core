import importPlugin from 'rollup-plugin-import';
import inject from "@rollup/plugin-inject";
import es3ify from 'rollup-plugin-es3ify';
const sky = require('../createRollupPlugin');

export default {
	input: './web.js',
	output: {
		strict: false,
		file: './dist/web.js',
		interop: false,
		format: 'iife'
	},
	plugins: [
		sky(),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		inject({
			"modules": {
				"XMLHttpRequest": "sky-core/pure/XMLHttpRequest"
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
		es3ify()
	]
};