function loadScript(src, charset) {
	return new Promise(function(resolve, reject) {
		var script = document.createElement('script');
		script.charset = charset || "UTF-8";
		script.src = src;
		script.async = true;
		var success = true;
		window.attachEvent('onerror', function(message, fileName, lineNumber) {
			window.detachEvent('onerror', arguments.callee);
			if(script.readyState === "interactive") {
				success = false;
				var error = new Error(lineNumber, message);
				error.fileName = fileName;
				error.lineNumber = lineNumber;
				reject(error);
				return false;
			}
		});
		var levent = 'onreadystatechange';
		script.attachEvent(levent, function() {
			if(script.readyState === 'loaded') {
				document.currentScript = script;
				document.head.appendChild(script);
				document.currentScript = undefined;
			} else if(script.readyState === 'loading') {
				script.detachEvent(levent, arguments.callee);
				reject(new URIError("Fail to loading: " + src));
				script = null;
			} else if(script.readyState === 'complete') {
				script.detachEvent(levent, arguments.callee);
				if(success) resolve(window.event);
				script = null;
			}
		});
	});
}