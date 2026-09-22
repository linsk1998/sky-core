export function loadScript(src, resolve, reject) {
	var script = document.createElement('SCRIPT');
	script.charset = "UTF-8";
	var success = true;
	function onError(message, filename, lineno, colno) {
		window.detachEvent('onerror', onError);
		if(script.readyState === "interactive") {
			success = false;
			var error = new Error(message);
			error.filename = filename;
			error.lineno = lineno;
			error.colno = colno;
			if(reject) reject(error);
			return false;
		}
	}
	window.attachEvent('onerror', onError);

	var event = 'onreadystatechange';
	function onReadyStateChange() {
		if(script.readyState === 'loaded') {
			document.head.appendChild(script);
		} else if(script.readyState === 'loading') {
			script.detachEvent(event, onReadyStateChange);
			window.detachEvent('onerror', onError);
			reject(new Error("Fail to loading: " + src));
			script = null;
		} else if(script.readyState === 'complete') {
			script.detachEvent(event, onReadyStateChange);
			window.detachEvent('onerror', onError);
			if(success) resolve(window.event);
			script = null;
		}
	}
	script.attachEvent(event, onReadyStateChange);
	script.src = src;
	return script;
};