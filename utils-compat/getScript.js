export function getScript(src, func, charset) {
	var script = document.createElement('script');
	script.charset = charset || "UTF-8";
	script.src = src;
	script.async = true;
	if(func) {
		var event = 'onreadystatechange';
		script.attachEvent(event, function() {
			if(script.readyState === 'loaded') {
				document.currentScript = script;
				document.head.appendChild(script);
				document.currentScript = undefined;
			} else if(script.readyState === 'complete') {
				script.detachEvent(event, arguments.callee);
				var evt = window.event;
				func.call(script, evt);
				script = null;
			}
		});
	} else {
		document.head.appendChild(script);
	}
	return script;
};