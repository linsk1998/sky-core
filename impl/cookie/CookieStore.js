import "sky-core/polyfill/Array/prototype/filter";
import { EventTarget } from "../event/EventTarget";
import { inherits } from "sky-core/utils/inherits";
import { parseCookie } from "./parseCookie";
import { setCookie } from "./setCookie";

function CookieStore() {

}
inherits(CookieStore, EventTarget);

function getAll(init) {
	var cookies = parseCookie(document.cookie);
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
		return _setCookie(String(arguments[0]), arguments[1]);
	}
	return _setCookie(String(options.name), String(options.value), options);
};
CookieStore.prototype.delete = function(options) {
	if(typeof options === "object") {
		_delCookie(options.name, null, {
			path: options.path,
			domain: options.domain,
			secure: options.secure,
			expires: 0
		});
	} else {
		_delCookie(options.name, "", { expires: 0 });
	}
};


var COOKIE_INVALID_CHAR_REGEX = /^\s|[\x00-\x1F\x7F;]|\s$/;

function _setCookie(name, value, options) {
	return new Promise(function(resolve, reject) {
		if(COOKIE_INVALID_CHAR_REGEX.test(name) || COOKIE_INVALID_CHAR_REGEX.test(value)) {
			throw new TypeError("Failed to execute 'set' on 'CookieStore': Cookie was malformed and could not be stored, due to problem(s) while parsing.");
		}
		if(name.indexOf('=') >= 0) {
			throw new TypeError("Failed to execute 'set' on 'CookieStore': Cookie name cannot contain '='");
		}
		if(!name && value.indexOf('=') >= 0) {
			throw new TypeError("Failed to execute 'set' on 'CookieStore': Cookie value cannot contain '=' if the name is empty");
		}
		setCookie(name, value, options);
		resolve();
	});
}
function _delCookie(name, value, options) {
	return new Promise(function(resolve, reject) {
		if(COOKIE_INVALID_CHAR_REGEX.test(name)) {
			throw new TypeError("Failed to execute 'delete' on 'CookieStore': Cookie was malformed and could not be stored, due to problem(s) while parsing.");
		}
		if(name.indexOf('=') >= 0) {
			throw new TypeError("Failed to execute 'delete' on 'CookieStore': Cookie name cannot contain '='");
		}
		setCookie(name, value, options);
		resolve();
	});
}

export { CookieStore };
