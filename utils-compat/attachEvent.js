export function attachEvent(ele, evt, func){
	switch(ele.tagName){
		case "SCRIPT":
			if(evt=="load"){
				return onScriptLoad(ele,func);
			}
	}
	ele.attachEvent( 'on'+evt, func);
	ele=null;
};
function onScriptLoad(script,func){
	script.attachEvent('onreadystatechange', function(){
		if(script.readyState==='complete'){
			script.detachEvent('onreadystatechange',arguments.callee);
			var evt=window.event;
			func.call(script,evt);
			script=null;
		}
	});
}