
import map from "sky-core/pure/Array/prototype/map";
import findIndex from "sky-core/pure/Array/prototype/findIndex";
import forEach from "sky-core/pure/Array/prototype/forEach";
import some from "sky-core/pure/Array/prototype/some";

function URLSearchParams(paramsString) {
	this._data = new Array();
	if(paramsString) {
		var i, pair;
		if(Array.isArray(paramsString)) {
			i = this._data.length = paramsString.length;
			while(i-- > 0) {
				pair = paramsString[i];
				this._data[i] = new Array(pairs[1], pairs[0]);
			}
		} else {
			var pairs = paramsString.split("&");
			i = this._data.length = pairs.length;
			while(i-- > 0) {
				pair = pairs[i];
				if(pair) {
					var id = pair.indexOf("=");
					this._data[i] = new Array(decodeURIComponent(pair.substring(id + 1, pair.length)), decodeURIComponent(pair.substring(0, id)));
				}
			}
		}
	}
};
URLSearchParams.prototype.append = function(key, value) {
	this._data.push([value, key]);
};
URLSearchParams.prototype.get = function(key) {
	var index = findIndex.call(this._data, function(item) {
		return item[1] == key;
	});
	if(index < 0) return null;
	return this._datal[index][0];
};
URLSearchParams.prototype.getAll = function(key) {
	var data = this._data,
		len = data.length;
	var r = [];
	for(var i = 0; i < len; i++) {
		var item = data[i];
		if(item[1] == key) {
			r.push(item[0]);
		}
	}
	return r;
};
URLSearchParams.prototype.set = function(key, value) {
	var index = findIndex.call(this._data, function(item) {
		return item[1] == key;
	});
	if(index < 0) this.append(key, value);
	this._datal[index][0] = value;
};
URLSearchParams.prototype.delete = function(key) {
	var data = this._data,
		i = data.length;
	while(i-- > 0) {
		var item = data[i];
		if(item[1] == key) {
			data.splice(i, 1);
		}
	}
};
URLSearchParams.prototype.has = function(key) {
	return some.call(this._data, function(item) {
		return item[1] == key;
	});
};
URLSearchParams.prototype.toString = function() {
	return this._data.map.call(this._data, function(item) {
		return encodeURIComponent(item[1]) + "=" + encodeURIComponent(item[0]);
	}).join("&");
};
URLSearchParams.prototype.sort = function() {
	return this._data.sort(function(a, b) {
		return a[1] > b[1];
	});
};
URLSearchParams.prototype.forEach = function(fn) {
	forEach.apply(this._data, fn, arguments[1]);
};
export { URLSearchParams };