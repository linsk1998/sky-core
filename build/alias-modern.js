
const fs=require("fs");
const path=require("path");

exports.modules= fs.readdirSync(path.resolve(__dirname, "../modules-modern")).map(function(file){
	var name=file.replace(/\.js$/i,"");
	return { find:"core-js/modules/"+name , replacement: path.resolve(__dirname, "../modules-modern/"+name)};
}).concat([
	{ find:"core-js/modules/esnext.global-this" , replacement: path.resolve(__dirname, "../modules/es.global-this")},
	{ find:"core-js/modules" , replacement: path.resolve(__dirname, "../modules")}
]);
exports.utils= fs.readdirSync(path.resolve(__dirname, "../utils-modern")).map(function(file){
	var name=file.replace(/\.js$/i,"");
	return { find:"sky-core/utils/"+name , replacement: path.resolve(__dirname, "../utils-modern/"+name)};
}).concat([
	{ find:'sky-core/utils' , replacement: path.resolve(__dirname, "../utils")},
	{ find:'sky-core' , replacement: path.resolve(__dirname, "../utils")}
]);
exports.polyfills= fs.readdirSync(path.resolve(__dirname, "../polyfill-modern")).map(function(file){
	var name=file.replace(/\.js$/i,"");
	return { find:"sky-core/polyfill/"+name , replacement: path.resolve(__dirname, "../polyfill-modern/"+name)};
}).concat([
	{ find:'sky-core/polyfill' , replacement: path.resolve(__dirname, "../polyfill")}
]);