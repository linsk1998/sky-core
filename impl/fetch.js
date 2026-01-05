import { Headers, normalizeName, normalizeValue } from "./Headers";
import { Request } from "./Request";
import { Response } from "./Response";

function parseHeaders(rawHeaders) {
	var headers = new Headers();
	// Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	// https://tools.ietf.org/html/rfc7230#section-3.2
	var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
	// Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
	// https://github.com/github/fetch/issues/748
	// https://github.com/zloirock/core-js/issues/751
	preProcessedHeaders
		.split('\r')
		.map(function(header) {
			return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header;
		})
		.forEach(function(line) {
			var parts = line.split(':');
			var key = parts.shift().trim();
			if(key) {
				var value = parts.join(':').trim();
				try {
					headers.append(key, value);
				} catch(error) {
					console.warn('Response ' + error.message);
				}
			}
		});
	return headers;
}
export function fetch(input, init) {
	return new Promise(function(resolve, reject) {
		var request = new Request(input, init);

		if(request.signal.aborted) {
			return reject(new DOMException('Aborted', 'AbortError'));
		}

		var xhr = new XMLHttpRequest();

		function abortXhr() {
			xhr.abort();
		}

		request.signal.addEventListener('abort', abortXhr);

		xhr.onreadystatechange = function() {
			// DONE (success or failure)
			if(xhr.readyState === 4) {
				request.signal.removeEventListener('abort', abortXhr);

				var options = {
					statusText: xhr.statusText,
					headers: parseHeaders(xhr.getAllResponseHeaders() || '')
				};
				// This check if specifically for when a user fetches a file locally from the file system
				// Only if the status is out of a normal range
				if(request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
					options.status = 200;
				} else {
					options.status = xhr.status;
				}
				options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
				var body = 'response' in xhr ? xhr.response : xhr.responseText;
				setTimeout(function() {
					resolve(new Response(body, options));
				}, 0);
			}
		};

		xhr.onerror = function() {
			setTimeout(function() {
				reject(new TypeError('Network request failed'));
			}, 0);
		};

		xhr.ontimeout = function() {
			setTimeout(function() {
				reject(new TypeError('Network request timed out'));
			}, 0);
		};

		xhr.onabort = function() {
			setTimeout(function() {
				reject(new DOMException('Aborted', 'AbortError'));
			}, 0);
		};

		function fixUrl(url) {
			if(url == "") {
				return document.baseURI;
			} else if(url.startsWith("//")) {
				return location.protocol + url;
			}
			return url;
		}

		xhr.open(request.method, fixUrl(request.url), true);

		if(request.credentials === 'include') {
			xhr.withCredentials = true;
		} else if(request.credentials === 'omit') {
			xhr.withCredentials = false;
		}

		if('responseType' in xhr) {
			if(window.Blob) {
				xhr.responseType = 'blob';
			} else if(
				window.ArrayBuffer
			) {
				xhr.responseType = 'arraybuffer';
			}
		}

		if(init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
			var names = [];
			Object.getOwnPropertyNames(init.headers).forEach(function(name) {
				names.push(normalizeName(name));
				xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
			});
			request.headers.forEach(function(value, name) {
				if(names.indexOf(name) === -1) {
					xhr.setRequestHeader(name, value);
				}
			});
		} else {
			request.headers.forEach(function(value, name) {
				xhr.setRequestHeader(name, value);
			});
		}


		xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	});
}