import { EventTarget } from "./EventTarget";
import { hasOwn } from "../../impl-modern/Object/hasOwn";

function Storage() {
	this.clear();
}

var proto = Storage.prototype = Object.create(EventTarget.prototype);
proto.constructor = Storage;
proto.getItem = function(key) {
	if(hasOwn(this._store, key)) {
		return this._store[key];
	}
	return null;
};
proto.setItem = function(key, value) {
	if(!hasOwn(this._store, key)) {
		this.length++;
	}
	this._store[key] = value;
};
proto.removeItem = function(key) {
	if(hasOwn(this._store, key)) {
		delete this._store[key];
		this.length--;
	}
};
proto.clear = function() {
	this._store = {};
	this.length = 0;
};
proto.key = function(idx) {
	var i = 0;
	for(var key in this._store) {
		if(hasOwn(this._store, key)) {
			if(i === idx) {
				return key;
			}
			i++;
		}
	}
	return null;
};
proto.sham = true;

export { Storage };