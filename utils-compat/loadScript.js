export { Error } from "../native/Error";
export function loadScript(src, charset) {
	return new Promise(function(resolve, reject) {
		var script = document.createElement('script');
		script.charset = charset || "UTF-8";
		script.src = src;
		script.async = true;
		var success = true;
		function onError(message, fileName, lineNumber) {
			window.detachEvent('onerror', onError);
			if(script.readyState === "interactive") {
				success = false;
				var error = new Error(lineNumber, message);
				error.fileName = fileName;
				error.lineNumber = lineNumber;
				reject(error);
				return false;
			}
		}
		window.attachEvent('onerror', onError);
		var levent = 'onreadystatechange';
		function onReadyStateChange() {
			if(script.readyState === 'loaded') {
				document.currentScript = script;
				document.head.appendChild(script);
				document.currentScript = undefined;
			} else if(script.readyState === 'loading') {
				script.detachEvent(levent, onReadyStateChange);
				window.detachEvent('onerror', onError);
				reject(new URIError("Fail to loading: " + src));
				script = null;
			} else if(script.readyState === 'complete') {
				script.detachEvent(levent, onReadyStateChange);
				window.detachEvent('onerror', onError);
				if(success) resolve(window.event);
				script = null;
			}
		}
		script.attachEvent(levent, onReadyStateChange);
	});
}