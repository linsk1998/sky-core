export function getScript(src, resolve, reject) {
	var script = document.createElement('SCRIPT');
	script.charset = "UTF-8";
	var event = 'onreadystatechange';
	function onReadyStateChange() {
		if(script.readyState === 'loaded') {
			document.head.appendChild(script);
		} else if(script.readyState === 'loading') {
			script.detachEvent(event, onReadyStateChange);
			if(reject) reject(new Error("Fail to loading: " + src));
			script = null;
		} else if(script.readyState === 'complete') {
			script.detachEvent(event, onReadyStateChange);
			if(resolve) resolve(window.event);
			script = null;
		}
	}
	script.attachEvent(event, onReadyStateChange);
	script.src = src;
	return script;
};