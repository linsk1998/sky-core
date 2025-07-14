import { SearchParams } from "../impl/SearchParams";

export function URL(relativePath) {
	if(typeof relativePath !== "string") relativePath = String(relativePath);
	var absolutePath = arguments[1];
	if(absolutePath !== undefined) {
		if(typeof absolutePath !== "object" || !absolutePath.href) {
			absolutePath = new URL(absolutePath);
		}
	}
	this.searchParams = new SearchParams(this);
	var path, arr;
	var pattern = /^(\w+:)(?:\/\/(?:([^@:/]+)(?:\:([^@:/]+))?@)?([^:/]*)(?:\:([^/]+))?)?(\/[^?#]*)?(\?[^#]*)?(\#.*)?$/;
	if(arr = relativePath.match(pattern)) {
		this.protocol = arr[1];
		this.username = arr[2] || '';
		this.password = arr[3] || '';
		this.hostname = arr[4] || '';
		this.port = arr[5] || '';
		this.pathname = arr[6] || '';
		this.search = arr[7] || '';
		this.hash = arr[8] || '';
	} else if(absolutePath) {
		var absInfo = absolutePath.indexOf ? new URL(absolutePath) : absolutePath;
		this.protocol = absInfo.protocol;
		this.username = absInfo.username;
		this.password = absInfo.password;
		this.pathname = absInfo.pathname;
		this.hostname = absInfo.hostname;
		this.port = absInfo.port;
		if(relativePath.startsWith("#")) {
			this.search = absInfo.search;
			this.hash = relativePath;
			return;
		} else if(relativePath.startsWith("?")) {
			var a = relativePath.indexOf("#");
			if(a < 0) {
				this.search = relativePath;
				this.hash = "";
			} else {
				this.search = relativePath.substr(0, a);
				this.hash = relativePath.substring(a, relativePath.length);
			}
			return;
		} else if(relativePath.startsWith("/")) {
			path = relativePath;
		} else if(relativePath.startsWith("../")) {
			path = absInfo.pathname.replace(/\/[^\/]*$/, "/") + relativePath;
			pattern = /[^\/]+\/\.\.\//;
			while(pattern.test(path)) {
				path = path.replace(pattern, "");
			}
			path = path.replace(/^(\/\.\.)+/, "");
		} else {
			path = absInfo.pathname.replace(/[^\/]*$/, "") + relativePath.replace(/^\.\//, "");
		}
		this.pathname = path;
		this.search = '';
		this.hash = '';
	} else {
		throw new TypeError("Invalid URL");
	}
};

export var URLProperties = {
	host: {
		enumerable: true,
		get: function() {
			if(this.port) {
				return this.hostname + ":" + this.port;
			}
			return this.hostname;
		},
		set: function(value) {
			var pattern = /(.*):(\d+)$/;
			var arr = value.match(pattern);
			this.port = "";
			if(arr) {
				this.hostname = arr[1];
				this.port = arr[2];
			} else {
				this.hostname = value;
			}
		}
	},
	origin: {
		enumerable: true,
		get: function() {
			return this.protocol + "//" + this.host;
		}
	},
	href: {
		enumerable: true,
		get: function() {
			var user = this.username;
			if(user) {
				if(this.password) {
					user += ":" + this.password;
				}
				user += "@";
			}
			return this.protocol + "//" + user + this.host + this.pathname + this.search + this.hash;
		},
		set: function(value) {
			var url = new URL(value);
			if(url.hostname) {
				this.hostname = url.hostname;
				this.port = url.port;
			} else {
				this.host = url.host;
			}
			this.protocol = url.protocol;
			this.pathname = url.pathname;
			this.search = url.search;
			this.hash = url.hash;
			this.username = url.username;
			this.password = url.password;
		}
	}
};
URL.prototype.toString = URL.prototype.toJSON = function() {
	return this.href;
};
export function getSearchParams() {
	var searchParams = new SearchParams(this);
	Object.defineProperty(this, "searchParams", {
		enumerable: true,
		value: searchParams
	});
	return searchParams;
}