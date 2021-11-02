
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import es3ify from 'rollup-plugin-es3ify';
export default {
	input: 'qunit/es/index.js',
	output: {
		strict: false,
		file: 'qunit/core-js/index.js',
		format: 'iife'
	},
	context: "window",
	treeshake: false,
	plugins: [
		nodeResolve(),
		commonjs(),
		babel({
			babelHelpers: 'bundled',
			babelrc: false,
			presets: [
				[
					"@babel/preset-env",
					{
						"modules": false,
						"loose": true,
						"useBuiltIns": "usage",
						"corejs": "3.8"
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
			],
			include: ["qunit/**/*"]
		}),
		es3ify()
	]
};