import importPlugin from 'rollup-plugin-import';
const sky = require('../createRollupPlugin');

export default {
	input: './web.js',
	output: {
		strict: false,
		file: './dist/web-modern.js',
		format: 'iife'
	},
	plugins: [
		sky('modern'),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
	]
};