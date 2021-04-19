
export function trigger(ele, type, props) {
	switch(type){
		case 'load':
		case 'wheel':
		case 'input':
			break;
		default:
			if(!props) {
				return ele.fireEvent("on" + type);
			}
	}
	var e = document.createEventObject();
	switch(type){
		case 'load':
			if(ele.tagName=="SCRIPT"){
				e.polyfill=true;
				ele.fireEvent("onreadystatechange",e);
				return;
			}
			break;
		case 'wheel':
			type='mousewheel';
			break;
		case "DOMContentLoaded":
			if(ele===document){
				e.polyfill=true;
				ele.fireEvent("onreadystatechange",e);
				return;
			}
			break;
		case 'input':
			e.propertyName='value';
			e.polyfill=true;
			ele.fireEvent("onpropertychange",e);
			return;
		default:
	}
	if(props) {
		for(var key in props){
			e[key]=props[key];
		}
	}
	ele.fireEvent("on" + type, e);
};