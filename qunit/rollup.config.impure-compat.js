
import path from "path";
import alias from "@rollup/plugin-alias";
import babel from '@rollup/plugin-babel';
import importPlugin from 'rollup-plugin-import';
import { polyfills, pures, utils } from "../build/alias-compat";
import impure from "./impure-compat";
export default {
	input: 'qunit/es/index.js',
	output: {
		strict: false,
		file: 'qunit/impure-multi/compat.js',
		format: 'iife'
	},
	context: "window",
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
				"@babel/plugin-transform-member-expression-literals",
				"@babel/plugin-transform-property-literals",
				"@babel/plugin-transform-reserved-words",
				["@babel/plugin-transform-for-of", {
					"loose": false
				}]
			],
			include: ["qunit/**/*"]
		}),
		...impure,
		alias({
			entries: [
			].concat(pures).concat(polyfills).concat(utils)
		}),
	]
};