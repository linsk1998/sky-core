import "core-js/modules/es.array.includes";
import "core-js/modules/es.object.assign";
var notCapture=["load","unload","scroll","resize","blur","focus","mouseenter","mouseleave","input","propertychange"];
export function fireEvent(ele,evt,props){
	var e=document.createEvent('Event');
	var bubbles=true;
	var cancelable=true;
	if(props){
		if('bubbles' in props) bubbles=props.bubbles;
		if('cancelable' in props) cancelable=props.cancelable;
		if(bubbles && notCapture.includes(evt)){
			bubbles=false;
		}
		try{
			delete props.type;
			delete props.bubbles;
			delete props.cancelable;
		}catch(err){}
		Object.assign(e,props);
	}
	e.initEvent(evt,bubbles,cancelable);
	return ele.dispatchEvent(e);
};