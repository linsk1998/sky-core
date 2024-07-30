
import alias from "@rollup/plugin-alias";
import importPlugin from 'rollup-plugin-import';
import inject from "@rollup/plugin-inject";
import es3ify from 'rollup-plugin-es3ify';
import { modules, polyfills, pures, utils } from "./alias-compat.mjs";
export default {
	input: './web.js',
	output: {
		strict: false,
		file: './dist/web-compat.js',
		format: 'iife'
	},
	plugins: [
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
		alias({
			entries: [
			].concat(pures).concat(polyfills).concat(utils).concat(modules)
		}),
		es3ify()
	]
};