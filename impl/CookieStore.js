import { EventTarget } from "./EventTarget";
import { inherits } from "sky-core/utils/inherits";
import "sky-core/polyfill/Array/prototype/filter";

// 这个是给cookie专用的，字符串自带的trim会导致\u3000\xA0被去除
function trim(s) {
	return s.replace(/^\s+|\s+$/g, '');
}

function parse(str) {
	var obj = [];
	var pairs = str.split(/; */);
	var len = pairs.length;

	for(var i = 0; i < len; i++) {
		var pair = pairs[i];
		var eqIdx = pair.indexOf('=');

		// skip things that don't look like key=value
		if(eqIdx < 0) {
			continue;
		}

		var key = trim(pair.substring(0, eqIdx));
		var val = trim(pair.substring(++eqIdx, pair.length));

		if(undefined == obj[key]) {
			obj.push({
				name: key,
				value: val,
			});
		}
	}

	return obj;
}

function CookieStore() {

}
inherits(CookieStore, EventTarget);

function getAll(init) {
	var cookies = parse(document.cookie);
	if(init == null) {
		return cookies;
	}
	var name;
	if(typeof init === 'string') {
		name = init;
	} else {
		if(init.url) {
			throw new TypeError('URL must match the document URL');
		}
		name = init.name;
		if(name == null) return cookies;
	}
	return cookies.filter((cookie) => cookie.name === name);
}
CookieStore.prototype.get = function(options) {
	if(options == null) throw new TypeError("CookieStoreGetOptions must not be empty");
	return new Promise(function(resolve) {
		resolve(getAll(options)[0]);
	});
};

CookieStore.prototype.getAll = function(init) {
	return new Promise(function(resolve) {
		resolve(getAll(init));
	});
};
CookieStore.prototype.set = function(options) {
	if(arguments.length > 1) {
		return _setCookie({
			name: String(options.name),
			value: String(options.value)
		});
	}
	return _setCookie(options);
};
CookieStore.prototype.delete = function(options) {
	return new Promise(function(resolve, reject) {
		if(typeof options === "object") {
			setCookieImpl(options.name, null, { expires: 0 });
		} else {
			setCookieImpl({
				name: options.name,
				path: options.path,
				domain: options.domain,
				expires: 0
			});
		}
		resolve();
	});
};


var COOKIE_INVALID_CHAR_REGEX = /^\s|[\x00-\x1F\x7F;]|\s$/;

function _setCookie(item) {
	return new Promise(function(resolve, reject) {
		var name = item.name;
		var value = item.value;
		if(COOKIE_INVALID_CHAR_REGEX.test(name) || COOKIE_INVALID_CHAR_REGEX.test(value)) {
			throw new TypeError("Failed to execute 'set' on 'CookieStore': Cookie was malformed and could not be stored, due to problem(s) while parsing.");
		}
		if(name.indexOf('=') >= 0) {
			throw new TypeError("Failed to execute 'set' on 'CookieStore': Cookie name cannot contain '='");
		}
		if(!name && value.indexOf('=') >= 0) {
			throw new TypeError("Failed to execute 'set' on 'CookieStore': Cookie value cannot contain '=' if the name is empty");
		}

		var cookie = name + '=' + value;

		var domain = item.domain;
		if(domain) {
			cookie += '; Domain=' + domain;
		}

		resolve();
	});
}

function setCookieImpl(name, value, options) {
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
}

export { CookieStore };
