import { EventTarget } from "./EventTarget";

function LocalStorage(element) {
	this._el = element;
	this.length = 0;
}

var proto = LocalStorage.prototype = Object.create(EventTarget.prototype);
proto.constructor = LocalStorage;
proto.getItem = function(key) {
	this._el.load("localStorage");
	return this._el.getAttribute(key);
};
proto.getItem = function(key) {
	this._el.load("localStorage");
	return this._el.getAttribute(key);
};
proto.setItem = function(key, value) {
	this._el.setAttribute(key, new String(value));
	this._el.save("localStorage");
	var xml = this._el.XMLDocument;
	var root = xml.documentElement;
	this.length = root.attributes.length;
};
proto.removeItem = function(key) {
	this._el.removeAttribute(key);
	this._el.save("localStorage");
	var xml = this._el.XMLDocument;
	var root = xml.documentElement;
	this.length = root.attributes.length;
};
proto.clear = function() {
	var xml = this._el.XMLDocument;
	var root = xml.documentElement;
	// 清空xml全部自定义属性，自动保留expires
	while(root.attributes.length > 0) {
		root.removeAttribute(root.attributes[0].nodeName);
	}
	this._el.save("localStorage");
	this.length = 0;
};
proto.key = function(idx) {
	var xml = storeDom.XMLDocument.documentElement;
	for(var i = 0; i < xml.attributes.length; i++) {
		if(i === idx) {
			return xml.attributes[i].nodeName;
		}
	}
	return null;
};
proto.sham = true;

export { LocalStorage };