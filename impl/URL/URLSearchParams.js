import { urlDecode } from "../../utils/urlDecode";

function URLSearchParams(paramsString) {
	this._data = new Array();
	if(paramsString) {
		var i, pair, pairs, poi, key, value;
		if(Array.isArray(paramsString)) {
			i = this._data.length = paramsString.length;
			while(i-- > 0) {
				pair = paramsString[i];
				this._data[i] = [pair[1], pair[0]];
			}
		} else {
			pairs = paramsString.split("&");
			i = this._data.length = pairs.length;
			while(i-- > 0) {
				pair = pairs[i];
				if(pair) {
					poi = pair.indexOf("=");
					if(poi >= 0) {
						value = urlDecode(pair.substring(poi + 1, pair.length));
						key = urlDecode(pair.substring(0, poi));
					} else {
						key = urlDecode(pair);
						value = "";
					}
					this._data[i] = [value, key];
				}
			}
		}
	}
};
URLSearchParams.prototype.append = function(key, value) {
	this._data.push([value, key]);
};
URLSearchParams.prototype.get = function(key) {
	var data = this._data,
		len = data.length, i, item;
	for(i = 0; i < len; i++) {
		item = data[i];
		if(item[1] == key) {
			return item[0];
		}
	}
	return null;
};
URLSearchParams.prototype.getAll = function(key) {
	var data = this._data,
		len = data.length, i, item;
	var r = [];
	for(i = 0; i < len; i++) {
		item = data[i];
		if(item[1] == key) {
			r.push(item[0]);
		}
	}
	return r;
};
URLSearchParams.prototype.set = function(key, value) {
	var data = this._data,
		len = data.length, i;
	for(i = 0; i < len; i++) {
		if(data[i][1] == key) {
			data.splice(i, 1);
			i--; len--;
		}
	}
	this.append(key, value);
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
	var arr = this._data;
	var i = arr.length;
	while(i--) {
		if(arr[i][1] == key) {
			return true;
		}
	}
	return false;
};
function formEncode(str) {
	return encodeURIComponent(str).replace(/%20/g, "+").replace(/[!'()]/g, function(c) {
		return "%" + c.charCodeAt(0).toString(16).toUpperCase();
	});
}
URLSearchParams.prototype.toString = function() {
	return this._data.map.call(this._data, function(item) {
		return formEncode(item[1]) + "=" + formEncode(item[0]);
	}).join("&");
};
URLSearchParams.prototype.sort = function() {
	return this._data.sort(function(a, b) {
		return a[1] > b[1];
	});
};
URLSearchParams.prototype.forEach = function(fn) {
	// 如果业务中使用了.forEach则会自动依赖Array 的forEach,因此不必手动引入依赖。
	this._data.forEach(fn, arguments[1]);
};
export { URLSearchParams };