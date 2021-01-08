import { SearchParams } from "../impl/SearchParams";

export function URL(relativePath, absolutePath) {
	var path, arr;
	this.port = this.search = this.hash = this.username = this.password = "";
	this.searchParams = new SearchParams(this);
	var pattern = /^[a-zA-Z]+:/;
	if(arr = relativePath.match(pattern)) {
		this.protocol = arr[0];
		path = relativePath.replace(pattern, "");
		pattern = /^\/*([^\/]+)/;
		var host = path.match(pattern)[1];
		path = path.replace(pattern, "");
		arr = host.split("@");
		if(arr.length > 1) {
			this.host = arr[1];
			arr = arr[0].split(":");
			if(arr.length > 1) {
				this.username = arr[0];
				this.password = arr[1];
			} else {
				this.username = arr[0];
			}
		} else {
			this.host = host;
		}
	} else if(absolutePath) {
		var absInfo = absolutePath.indexOf ? new URL(absolutePath) : absolutePath;
		if(absInfo.hostname) {
			this.hostname = absInfo.hostname;
			this.port = absInfo.port;
		} else {
			this.host = absInfo.host;
		}
		this.protocol = absInfo.protocol;
		if(absInfo.username) this.username = absInfo.username;
		if(absInfo.password) this.password = absInfo.password;
		this.pathname = absInfo.pathname;
		if(relativePath.startsWith("#")) {
			this.search = absInfo.search;
			this.hash = relativePath;
			return this;
		} else if(relativePath.startsWith("?")) {
			var a = relativePath.indexOf("#");
			if(a < 0) {
				this.search = relativePath;
				this.hash = "";
			} else {
				this.search = relativePath.substr(0, a);
				this.hash = relativePath.substring(a, relativePath.length);
			}
			return this;
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
	} else {
		throw new TypeError("SYNTAX_ERROR");
	}
	pattern = /^[^#]*/;
	this.hash = path.replace(pattern, "");
	arr = path.match(pattern);
	path = arr[0];
	pattern = /^[^\?]*/;
	this.search = path.replace(pattern, "");
	arr = path.match(pattern);
	this.pathname = arr[0];
	return this;
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
export function getSearchParams() {
	var searchParams = new SearchParams(this);
	Object.defineProperty(this, "searchParams", {
		enumerable: true,
		value: searchParams
	});
	return searchParams;
}