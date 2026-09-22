import { Body } from "./Body";

export function Response(bodyInit, options) {
	if(!(this instanceof Response)) {
		throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
	}
	if(!options) {
		options = {};
	}

	this.type = 'default';
	this.status = options.status === undefined ? 200 : options.status;
	if(this.status < 200 || this.status > 599) {
		throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
	}
	this.ok = this.status >= 200 && this.status < 300;
	this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
	this.headers = new Headers(options.headers);
	this.url = options.url || '';
	this._initBody(bodyInit);
}

Body.call(Response.prototype);

Response.prototype.clone = function() {
	if(this.bodyUsed) {
		throw new TypeError("Clone response body Used");
	}
	return new Response(this._bodyInit, {
		status: this.status,
		statusText: this.statusText,
		headers: new Headers(this.headers),
		url: this.url
	});
};

Response.error = function() {
	var response = new Response(null, { status: 200, statusText: '' });
	response.ok = false;
	response.status = 0;
	response.type = 'error';
	return response;
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function(url, status) {
	if(redirectStatuses.indexOf(status) === -1) {
		throw new RangeError('Invalid status code');
	}

	return new Response(null, { status: status, headers: { location: url } });
};