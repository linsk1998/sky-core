function Headers(headers) {
	this.map = {};
	if(headers instanceof Headers) {
		headers.forEach(function(value, name) {
			this.append(name, value);
		}, this);
	} else if(Array.isArray(headers)) {
		headers.forEach(function(header) {
			if(header.length != 2) {
				throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length);
			}
			this.append(header[0], header[1]);
		}, this);
	} else if(headers) {
		for(var name in headers) {
			if(Object.hasOwn(headers, name)) {
				this.append(name, headers[name]);
			}
		}
	}
}
Headers.prototype.append = function(name, value) {
	name = normalizeName(name);
	value = normalizeValue(value);
	var oldValue = Object.hasOwn(this.map, name) ? this.map[name] : null;
	this.map[name] = oldValue ? oldValue + ', ' + value : value;
};
Headers.prototype['delete'] = function(name) {
	delete this.map[normalizeName(name)];
};
Headers.prototype.get = function(name) {
	name = normalizeName(name);
	return Object.hasOwn(this.map, name) ? this.map[name] : null;
};
Headers.prototype.set = function(name, value) {
	this.map[normalizeName(name)] = normalizeValue(value);
};
Headers.prototype.has = function(name) {
	return Object.hasOwn(this.map, normalizeName(name));
};
Headers.prototype.forEach = function(callback, thisArg) {
	for(var key in this.map) {
		if(Object.hasOwn(this.map, key)) {
			callback.call(thisArg, this.map[key], key, this);
		}
	}
};
Headers.prototype.keys = function() {
	return Object.keys(this.map).values();
};
Headers.prototype.values = function() {
	return Object.values(this.map).values();
};
Headers.prototype.entries = function() {
	return Object.entries(this.map).values();
};
Headers.prototype[Symbol.iterator] = Headers.prototype.entries;

export function normalizeName(name) {
	if(typeof name !== 'string') {
		name = String(name);
	}
	if(/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
		throw new TypeError('Invalid character in header field name: "' + name + '"');
	}
	return name.toLowerCase();
}

export function normalizeValue(value) {
	if(typeof value !== 'string') {
		value = String(value);
	}
	return value;
}

export { Headers };