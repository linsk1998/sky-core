
import path from "path";
import alias from "@rollup/plugin-alias";
import babel from '@rollup/plugin-babel';
import importPlugin from 'rollup-plugin-import';
import es3ify from 'rollup-plugin-es3ify';
import impure from "./impure";
export default {
	input: 'qunit/es/index.js',
	output: {
		strict: false,
		file: 'qunit/impure-universal/universal.js',
		format: 'iife'
	},
	context: "window",
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
				// "@babel/plugin-transform-member-expression-literals",
				// "@babel/plugin-transform-property-literals",
				// "@babel/plugin-transform-reserved-words",
				["@babel/plugin-transform-for-of", {
					"loose": false
				}]
			]
		}),
		...impure,
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