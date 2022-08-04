
import path from "path";
import alias from "@rollup/plugin-alias";
import babel from '@rollup/plugin-babel';
import importPlugin from 'rollup-plugin-import';
import { polyfills, pures, utils } from "../build/alias-compat";
import recommend from "./recommend-compat";
export default {
	input: 'qunit/es/index.js',
	output: {
		strict: false,
		file: 'qunit/recommend-multi/compat.js',
		format: 'iife'
	},
	context: "window",
	treeshake: true,
	plugins: [
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		...recommend,
		babel({
			babelHelpers: 'bundled',
			babelrc: false,
			presets: [
				[
					"@babel/preset-env",
					{
						"modules": false,
						"loose": true,
						"targets": "ie <= 8"
					}
				]
			],
			include: ["qunit/**/*"]
		}),
		alias({
			entries: [
			].concat(pures).concat(polyfills).concat(utils)
		}),
	]
};