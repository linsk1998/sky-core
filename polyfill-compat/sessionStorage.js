

import {getCookie} from "../utils/getCookie";
import {setCookie} from "../utils/setCookie";
if(!this.sessionStorage){
	this.sessionStorage=new function(){
		var ele=document.createElement("sessionStorage");
		var sessionId=getCookie("JSESSIONID");
		if(!sessionId){
			sessionId=Math.random().toString(16).replace("0.","");
			setCookie("JSESSIONID",sessionId);
		}
		if(ele.addBehavior){
			ele.addBehavior("#default#userData");
			document.head.appendChild(ele);
			this.getItem=function(key){
				ele.load(sessionId);
				return ele.getAttribute(key);
			};
			this.setItem=function(key,value){
				ele.setAttribute(key,new String(value));
				ele.save(sessionId);
			};
			this.removeItem=function(key){
				ele.removeAttribute(key);
				ele.save(sessionId);
			};
			this.sham=true;
		}
	}();
}