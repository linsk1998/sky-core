
import "core-js/modules/web.url";
import {getCurrentScript} from "./getCurrentScript";
export function getCurrentPath(){
	var url=new URL(getCurrentScript().src,location);
	try{
		return url.href;
	}finally{
		url=null;
	}
}