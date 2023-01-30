
import path from "path";
import alias from "@rollup/plugin-alias";
import babel from '@rollup/plugin-babel';
import importPlugin from 'rollup-plugin-import';
import nodeResolve from '@rollup/plugin-node-resolve';
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
	treeshake: false,
	plugins: [
		nodeResolve(),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		...recommend,
		babel({
			babelHelpers: 'runtime',
			babelrc: false,
			compact: false,
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
			plugins: [
				["@babel/plugin-transform-runtime", {
					absoluteRuntime: false,
					corejs: false,
					helpers: true,
					regenerator: true,
					useESModules: true,
					version: "7.20.1"
				}],
			]
		}),
		alias({
			entries: [
			].concat(pures).concat(polyfills).concat(utils)
		}),
	]
};