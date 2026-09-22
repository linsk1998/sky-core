
import importPlugin from 'rollup-plugin-import';
const sky = require('../createRollupPlugin');

export default {
	input: './index.js',
	output: {
		strict: false,
		file: './dist/utils.esm.js',
		format: 'esm'
	},
	context: "globalThis",
	plugins: [
		sky(),
		importPlugin({
			libraryName: "sky-core",
			libraryDirectory: "utils"
		}),
	]
};