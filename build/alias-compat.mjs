
import fs from "fs";
import path from "path";

export var modules= fs.readdirSync(path.resolve(__dirname, "../modules-compat")).map(function(file){
	var name=file.replace(/\.js$/i,"");
	return { find:"core-js/modules/"+name , replacement: path.resolve(__dirname, "../modules-compat/"+name)};
}).concat([
	{ find:"core-js/modules/esnext.global-this" , replacement: path.resolve(__dirname, "../modules/es.global-this")},
	{ find:"core-js/modules" , replacement: path.resolve(__dirname, "../modules")}
]);
export var utils= fs.readdirSync(path.resolve(__dirname, "../utils-compat")).map(function(file){
	var name=file.replace(/\.js$/i,"");
	return { find:"sky-core/utils/"+name , replacement: path.resolve(__dirname, "../utils-compat/"+name)};
}).concat([
	{ find:'sky-core/utils' , replacement: path.resolve(__dirname, "../utils")},
	{ find:'sky-core' , replacement: path.resolve(__dirname, "../utils")}
]);
export var polyfills= fs.readdirSync(path.resolve(__dirname, "../polyfill-compat")).map(function(file){
	var name=file.replace(/\.js$/i,"");
	return { find:"sky-core/polyfill/"+name , replacement: path.resolve(__dirname, "../polyfill-compat/"+name)};
}).concat([
	{ find:'sky-core/polyfill' , replacement: path.resolve(__dirname, "../polyfill")}
]);