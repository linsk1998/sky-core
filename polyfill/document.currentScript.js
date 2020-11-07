
import {getCurrentScript as ie_getCurrentScript} from "../utils-compat/getCurrentScript";
import {getStackSupport,getCurrentPathByStack,getCurrentScriptByLast} from "../impl-modern/currentScript";
var getCurrentScript,getCurrentPath;
if('currentScript' in document){
	getCurrentScript=function(){
		return document.currentScript;
	};
}else{
	if("readyState" in document.scripts[0]){
		getCurrentScript=ie_getCurrentScript;
	}else{
		document.addEventListener('load',function(e){
			if(e.target.tagName==="SCRIPT"){
				e.target.readyState="complete";
			}
		},true);
		if(getStackSupport()){
			getCurrentPath=getCurrentPathByStack;
		}
		getCurrentScript=getCurrentScriptByLast;
	}
	Object.defineProperty(document,"currentScript",{
		enumerable:true,
		get:getCurrentScript
	});
}
if(!getCurrentPath){
	getCurrentPath=function(){
		var url=new URL(getCurrentScript().src,location);
		try{
			return url.href;
		}finally{
			url=null;
		}
	};
}
export {getCurrentScript};
export {getCurrentPath};