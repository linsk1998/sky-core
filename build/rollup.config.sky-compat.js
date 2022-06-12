
import alias from "@rollup/plugin-alias";
import importPlugin from 'rollup-plugin-import';
import inject from "@rollup/plugin-inject";
import polyfill from "rollup-plugin-polyfill-inject";
import es3ify from 'rollup-plugin-es3ify';
import { modules, polyfills, pures, utils } from "./alias-compat.mjs";
export default {
	input: './sky.js',
	output: {
		strict: false,
		file: './dist/sky-compat.js',
		format: 'iife',
		name: 'Sky'
	},
	context: "window",
	plugins: [
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
		inject({
			"modules": {
				"Object.defineProperties": "sky-core/pure/Object/defineProperties",
				"Object.defineProperty": "sky-core/pure/Object/defineProperty",
				"Symbol": "sky-core/pure/Symbol",
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
		polyfill({
			"modules": {
				"Array.from": "sky-core/polyfill/Array/from",
				"Array.isArray": "sky-core/polyfill/Array/isArray",
				"Array.of": "sky-core/polyfill/Array/of",
				"Date": "sky-core/polyfill/Date/now",
				"Date": "sky-core/polyfill/Date/parse",
				"Date": "sky-core/polyfill/Date/constructor",
				"JSON": "sky-core/polyfill/JSON",
				"Object.assign": "sky-core/polyfill/Object/assign",
				"Object.create": "sky-core/polyfill/Object/create",
				"Object.entries": "sky-core/polyfill/Object/entries",
				"Object.fromEntries": "sky-core/polyfill/Object/fromEntries",
				"Object.getOwnPropertyDescriptor": "sky-core/polyfill/Object/getOwnPropertyDescriptor",
				"Object.getOwnPropertyDescriptors": "sky-core/polyfill/Object/getOwnPropertyDescriptors",
				"Object.getOwnPropertyNames": "sky-core/polyfill/Object/getOwnPropertyNames",
				"Object.getOwnPropertySymbols": "sky-core/polyfill/Object/getOwnPropertySymbols",
				"Object.getPrototypeOf": "sky-core/polyfill/Object/getPrototypeOf",
				"Object.is": "sky-core/polyfill/Object/is",
				"Object.keys": "sky-core/polyfill/Object/keys",
				"Object.values": "sky-core/polyfill/Object/values",
				"Reflect": "sky-core/polyfill/Reflect",
				"String.fromCodePoint": "sky-core/polyfill/String/fromCodePoint",
				"Map": "sky-core/polyfill/Map",
				"Promise": "sky-core/polyfill/Promise/allSettled",
				"Promise": "sky-core/polyfill/Promise/finally",
				"Promise": "sky-core/polyfill/Promise",
				"queueMicrotask": "sky-core/polyfill/queueMicrotask",
				"Set": "sky-core/polyfill/Set",
				"URL": "sky-core/polyfill/URL",
				"URLSearchParams": "sky-core/polyfill/URLSearchParams",
				"WeakMap": "sky-core/polyfill/WeakMap",
				"WeakSet": "sky-core/polyfill/WeakSet"
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
			entries: [
			].concat(pures).concat(polyfills).concat(utils).concat(modules)
		}),
		es3ify()
	]
};