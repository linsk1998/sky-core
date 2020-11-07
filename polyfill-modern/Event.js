import "core-js/modules/es.global-this";
if(typeof Event!=="function"){
	if(document.createEvent){
		globalThis.Event=function(evt,init){
			var e=document.createEvent('Event');
			if(init){
				e.initEvent(evt,init.bubbles,init.cancelable);
			}else{
				e.initEvent(evt,false,false);
			}
			return e;
		};
	}
}