import inject from "@rollup/plugin-inject";
import importPlugin from 'rollup-plugin-import';
const sky = require('../createRollupPlugin');

export default {
	input: './advance-modern.js',
	output: {
		strict: false,
		file: './dist/advance-modern.js',
		format: 'esm'
	},
	plugins: [
		sky('modern'),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
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