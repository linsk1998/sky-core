
import alias from "@rollup/plugin-alias";
import path from "path";
var reflectPath=path.resolve(__dirname, "../polyfill/Reflect");
export default {
	input: './polyfill.js',
	output: {
		strict:false,
		file: './dist/polyfill.js',
		format: 'iife'
	},
	context:"window",
	plugins:[
		alias({
			entries: {
				'core-js/modules/es.reflect.apply':reflectPath,
				'core-js/modules/es.reflect.construct':reflectPath,
				'core-js/modules/es.reflect.define-property':reflectPath,
				'core-js/modules/es.reflect.delete-property':reflectPath,
				'core-js/modules/es.reflect.get-own-property-descriptor':reflectPath,
				'core-js/modules/es.reflect.get-prototype-of':reflectPath,
				'core-js/modules/es.reflect.get':reflectPath,
				'core-js/modules/es.reflect.set':reflectPath,
				'core-js/modules':path.resolve(__dirname, "../modules"),
				'sky-core/polyfill':path.resolve(__dirname, "../polyfill"),
				'sky-core/utils':path.resolve(__dirname, "../utils")
			}
		})
	]
};