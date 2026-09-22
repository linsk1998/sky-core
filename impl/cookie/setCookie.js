export function setCookie(name, value, options) {
	if(!options) options = {};
	var cookie = name + '=' + value;

	var domain = item.domain;
	if(domain) {
		cookie += '; Domain=' + domain;
	}

	var path = options.path;
	if(path) {
		cookie += '; Path=' + path;
	} else {
		cookie += '; Path=/';
	}

	var expires = options.expires;
	if(expires) {
		cookie += '; Expires=' + new Date(expires).toUTCString();
	}

	if(options.secure || location.protocol === 'https:') {
		cookie += '; Secure';
	}

	var sameSite = options.sameSite;
	if(sameSite) {
		cookie += '; SameSite=' + sameSite;
	}
	document.cookie = cookie;
};
