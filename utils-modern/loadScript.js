import { loadScript as loadScriptIE } from "../utils-compat/loadScript";
import { loadScript as loadScriptST } from "../utils-es2015/loadScript";
var loadScript;

if(document.currentScript !== void 0) {
	loadScript = loadScriptST;
} else if(window.attachEvent && document.scripts[document.scripts.length - 1].readyState === "interactive") {
	loadScript = loadScriptIE;
} else {
	var last_error, last_filename;
	window.onerror = function(message, filename, lineno, colno, error) {
		last_error = error;
		last_filename = filename;
	};
	loadScript = function(src, resolve, reject) {
		var script = document.createElement('SCRIPT');
		script.charset = "UTF-8";
		script.src = src;
		src = script.src;
		script.async = true;
		var success = true;
		var windowError = function(e) {
			var filename = e.filename || last_filename;
			if(src === filename) {
				var sames = [];
				var scripts = document.scripts;
				var len = scripts.length;
				for(var i = 0; i < len; i++) {
					var el = scripts[i];
					if(el.src === src) {
						sames.push(el);
					}
				}
				if(sames[sames.length - 1] === script) {
					success = false;
					script.onerror = null;
					if(reject) {
						if(e.error) {
							reject(e.error);
						} else if(last_error) {
							reject(e);
						} else if(e.message) {
							reject(e);
						} else {
							reject(new Error("Fail to exec script: " + src));
						}
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

		script.onload = function() {
			window.removeEventListener('error', windowError, false);
			if(success && resolve) resolve();
		};
		document.head.appendChild(script);
	};
}


export { loadScript };