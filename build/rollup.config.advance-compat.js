
import alias from "@rollup/plugin-alias";
import inject from "@rollup/plugin-inject";
import importPlugin from 'rollup-plugin-import';
import { modules, polyfills, pures, utils } from "./alias-compat.mjs";
export default {
	input: './advance-compat.js',
	output: {
		strict: false,
		file: './dist/advance-compat.js',
		format: 'esm'
	},
	plugins: [
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		alias({
			entries: [
			].concat(pures).concat(polyfills).concat(utils).concat(modules)
		}),
		inject({
			"modules": {
				"Symbol.hasInstance": "sky-core/pure/Symbol/hasInstance",
				"Symbol.iterator": "sky-core/pure/Symbol/iterator",
				"Symbol.for": "sky-core/pure/Symbol/for",
				"Symbol": "sky-core/pure/Symbol"
			},
			"include": [
				"impl/**",
				"impl-compat/**",
				"impl-modern/**",
				"utils/**",
				"utils-compat/**",
				"utils-modern/**"
			]
		})
	]
};