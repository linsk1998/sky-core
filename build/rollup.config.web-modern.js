
import alias from "@rollup/plugin-alias";
import importPlugin from 'rollup-plugin-import';
import { modules, polyfills, pures, utils } from "./alias-modern.mjs";
export default {
	input: './web.js',
	output: {
		strict: false,
		file: './dist/web-modern.js',
		format: 'iife'
	},
	context: "window",
	plugins: [
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		alias({
			entries: [
			].concat(pures).concat(polyfills).concat(utils).concat(modules)
		})
	]
};