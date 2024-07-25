
import alias from "@rollup/plugin-alias";
import importPlugin from 'rollup-plugin-import';
import path from "path";
export default {
	input: './index.js',
	output: {
		strict: false,
		file: './dist/utils.esm.js',
		format: 'esm'
	},
	context: "globalThis",
	plugins: [
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		alias({
			entries: {
				'core-js/modules': path.resolve(__dirname, "../modules"),
				'sky-core/pure': path.resolve(__dirname, "../pure"),
				'sky-core/polyfill': path.resolve(__dirname, "../polyfill"),
				'sky-core/utils': path.resolve(__dirname, "../utils")
			}
		}),
	]
};