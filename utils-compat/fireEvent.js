
export function fireEvent(ele, evt, props) {
	if(!props) {
		return ele.fireEvent("on" + evt);
	}
	var e = document.createEventObject();
	if('bubbles' in props) {
		e.cancelBubble = !props.bubbles;
	}
	try {
		delete props.type;
		delete props.bubbles;
		delete props.returnValue;
	} catch(err) { }
	Object.assign(e, props);
	ele.fireEvent("on" + evt, e);
};