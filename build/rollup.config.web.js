import alias from "@rollup/plugin-alias";
import importPlugin from 'rollup-plugin-import';
import inject from "@rollup/plugin-inject";
import es3ify from 'rollup-plugin-es3ify';
import path from "path";
export default {
	input: './web.js',
	output: {
		strict: false,
		file: './dist/web.js',
		interop: false,
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
			entries: {
				'core-js/modules': path.resolve(__dirname, "../modules"),
				'sky-core/pure': path.resolve(__dirname, "../pure"),
				'sky-core/polyfill': path.resolve(__dirname, "../polyfill"),
				'sky-core/utils': path.resolve(__dirname, "../utils")
			}
		}),
		es3ify()
	]
};