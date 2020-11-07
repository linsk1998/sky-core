import "core-js/modules/es.global-this";
if(typeof Event!=="function"){
	if(document.createEventObject){
		globalThis.Event=function(evt,init){
			var e=document.createEventObject();
			e.type=evt;
			if(init){
				e.bubbles=init.bubbles;
				e.cancelable=init.cancelable;
			}else{
				e.bubbles=false;
				e.cancelable=false;
			}
			return e;
		};
	}
}