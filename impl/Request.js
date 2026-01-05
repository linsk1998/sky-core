import { Body } from "./Body";

// HTTP methods whose capitalization should be normalized
var methods = ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'];

function normalizeMethod(method) {
	var upcased = method.toUpperCase();
	return methods.indexOf(upcased) > -1 ? upcased : method;
}

export function Request(input, options) {
	if(!(this instanceof Request)) {
		throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
	}

	options = options || {};
	var body = options.body;

	if(input instanceof Request) {
		if(input.bodyUsed) {
			throw new TypeError('Already read');
		}
		this.url = input.url;
		this.credentials = input.credentials;
		if(!options.headers) {
			this.headers = new Headers(input.headers);
		}
		this.method = input.method;
		this.mode = input.mode;
		this.signal = input.signal;
		if(!body && input._bodyInit != null) {
			body = input._bodyInit;
			input.bodyUsed = true;
		}
	} else {
		this.url = String(input);
	}

	this.credentials = options.credentials || this.credentials || 'same-origin';
	if(options.headers || !this.headers) {
		this.headers = new Headers(options.headers);
	}
	this.method = normalizeMethod(options.method || this.method || 'GET');
	this.mode = options.mode || this.mode || null;
	this.signal = options.signal || this.signal || new AbortController().signal;
	this.referrer = null;

	if((this.method === 'GET' || this.method === 'HEAD') && body) {
		throw new TypeError('Body not allowed for GET or HEAD requests');
	}
	this._initBody(body);

	if(this.method === 'GET' || this.method === 'HEAD') {
		if(options.cache === 'no-store' || options.cache === 'no-cache') {
			// Search for a '_' parameter in the query string
			var reParamSearch = /([?&])_=[^&]*/;
			if(reParamSearch.test(this.url)) {
				// If it already exists then set the value with the current time
				this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
			} else {
				// Otherwise add a new '_' parameter to the end with the current time
				var reQueryString = /\?/;
				this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
			}
		}
	}
}
Request.prototype.clone = function() {
	return new Request(this, { body: this._bodyInit });
};
Body.call(Request.prototype);