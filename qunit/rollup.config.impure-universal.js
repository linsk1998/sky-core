
import path from "path";
import alias from "@rollup/plugin-alias";
import babel from '@rollup/plugin-babel';
import importPlugin from 'rollup-plugin-import';
import impure from "./impure";
export default {
	input: 'qunit/es/index.js',
	output: {
		strict: false,
		file: 'qunit/impure-universal/universal.js',
		format: 'iife'
	},
	treeshake: true,
	plugins: [
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		babel({
			babelHelpers: 'bundled',
			babelrc: false,
			presets: [
				[
					"@babel/preset-env",
					{
						"modules": false,
						"loose": true
					}
				]
			],
			plugins: [
				["@babel/plugin-transform-for-of", {
					"loose": false
				}]
			],
			include: ["qunit/**/*"]
		}),
		...impure,
		alias({
			entries: {
				'sky-core/pure': path.resolve(__dirname, "../pure"),
				'sky-core/polyfill': path.resolve(__dirname, "../polyfill"),
				'sky-core/utils': path.resolve(__dirname, "../utils")
			}
		})
	]
};