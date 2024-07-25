export function loadScript(src, resolve, reject) {
	var script = document.createElement('SCRIPT');
	script.src = src;
	script.async = true;
	var success = true;
	var windowError = function(e) {
		window.removeEventListener('error', windowError, false);
		if(document.currentScript === script) {
			success = false;
			script.onerror = null;
			if(reject) {
				if(e.error) {
					reject(e.error);
				} else if(e.message) {
					reject(e);
				} else {
					reject(new Error("Fail to exec script: " + src));
				}
			}
		}
	};
	window.addEventListener('error', windowError, false);

	script.onerror = function(e) {
		window.removeEventListener('error', windowError, false);
		success = false;
		if(reject) reject(new Error("Fail to load: " + src));
	};

	script.onload = function(e) {
		window.removeEventListener('error', windowError, false);
		if(success && resolve) resolve();
	};
	document.head.appendChild(script);
	return script;
};