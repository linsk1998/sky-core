function loadScript(src, charset) {
	return new Promise(function(resolve, reject) {
		var script = document.createElement('script');
		script.charset = charset || "UTF-8";
		script.src = src;
		script.async = true;
		var success = true;
		var windowError = function(e) {
			window.removeEventListener('error', windowError, false);
			if(document.currentScript === script) {
				success = false;
				script.onerror = null;
				if(e.error) {
					reject(e.error);
				} else if(e.message) {
					reject(e);
				} else {
					reject(new URIError("Fail to exec script: " + src));
				}
			}
		};
		script.onerror = function(e) {
			window.removeEventListener('error', windowError, false);
			success = false;
			script.onerror = null;
			reject(new URIError("Fail to load: " + src));
		};
		window.addEventListener('error', windowError, false);

		script.onload = function(e) {
			window.removeEventListener('error', windowError, false);
			script.onload = null;
			script = null;
			if(success) resolve();
		};
		document.head.appendChild(script);
	});
}