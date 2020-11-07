
import alias from "@rollup/plugin-alias";
import path from "path";
import {modules,polyfills} from "./alias-modern";
var reflectPath=path.resolve(__dirname, "../polyfill-modern/Reflect");
export default {
	input: './polyfill.js',
	output: {
		strict:false,
		file: './dist/polyfill-modern.js',
		format: 'iife'
	},
	context:"window",
	plugins:[
		alias({
			entries:[
				{ find:'core-js/modules/es.reflect.apply' , replacement:reflectPath},
				{ find:'core-js/modules/es.reflect.construct' , replacement:reflectPath},
				{ find:'core-js/modules/es.reflect.define-property' , replacement:reflectPath},
				{ find:'core-js/modules/es.reflect.delete-property' , replacement:reflectPath},
				{ find:'core-js/modules/es.reflect.get-own-property-descriptor' , replacement:reflectPath},
				{ find:'core-js/modules/es.reflect.get-prototype-of' , replacement:reflectPath},
				{ find:'core-js/modules/es.reflect.get' , replacement:reflectPath},
				{ find:'core-js/modules/es.reflect.set' , replacement:reflectPath},
				{ find:'core-js/modules' , replacement: path.resolve(__dirname, "../modules")}
			].concat(polyfills).concat(modules)
		})
	]
};