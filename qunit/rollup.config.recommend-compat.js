
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
			plugins: [
				["@babel/plugin-transform-runtime", {
					absoluteRuntime: false,
					corejs: false,
					helpers: true,
					regenerator: true,
					useESModules: true,
					version: "7.20.1"
				}],
				// ES2019
				"@babel/plugin-proposal-optional-catch-binding",
				"@babel/plugin-proposal-json-strings",
				// ES2018
				"@babel/plugin-proposal-async-generator-functions",
				// "@babel/plugin-transform-dotall-regex"
				"@babel/plugin-transform-named-capturing-groups-regex",
				["@babel/plugin-proposal-object-rest-spread", { loose: true, "useBuiltIns": true }],
				// "@babel/plugin-proposal-unicode-property-regex"
				// ES2017
				// "@babel/plugin-transform-async-to-generator",
				// ES2016
				"@babel/plugin-transform-exponentiation-operator",
				// ES2015
				// "@babel/plugin-transform-regenerator",
				"@babel/plugin-transform-arrow-functions",
				// "@babel/plugin-transform-block-scoped-functions",
				"@babel/plugin-transform-block-scoping",
				["@babel/plugin-transform-classes", { loose: true }],
				["@babel/plugin-transform-computed-properties", { loose: true }],
				["@babel/plugin-transform-destructuring", { loose: true, "useBuiltIns": true }],
				"@babel/plugin-transform-duplicate-keys",
				["@babel/plugin-transform-for-of", { loose: true }],
				// "@babel/plugin-transform-instanceof",
				"@babel/plugin-transform-literals",
				"@babel/plugin-transform-new-target",
				// "@babel/plugin-transform-object-super",
				["@babel/plugin-transform-parameters", { loose: true }],
				"@babel/plugin-transform-shorthand-properties",
				["@babel/plugin-transform-spread", { loose: true }],
				// "@babel/plugin-transform-sticky-regex",
				["@babel/plugin-transform-template-literals", { loose: true }],
				"@babel/plugin-transform-typeof-symbol",
				// ES5
				// "@babel/plugin-transform-property-mutators",
				// ES3
				// "@babel/plugin-transform-member-expression-literals",
				// "@babel/plugin-transform-property-literals",
				// "@babel/plugin-transform-reserved-words",
				// "@babel/plugin-transform-jscript"
			],
			include: [
				"qunit/**/*",
			]
		}),
		babel({
			babelHelpers: 'bundled',
			babelrc: false,
			compact: false,
			plugins: [
				"@babel/plugin-transform-member-expression-literals",
				"@babel/plugin-transform-property-literals",
				"@babel/plugin-transform-reserved-words",
				"@babel/plugin-transform-jscript"
			]
		}),
		alias({
			entries: [
			].concat(pures).concat(polyfills).concat(utils)
		}),
	]
};