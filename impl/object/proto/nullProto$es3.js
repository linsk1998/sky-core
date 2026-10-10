import { dontEnums } from "../../../utils-compat/dontEnums";

var GT = '>';
var LT = '<';
var SCRIPT = 'script';

function scriptTag(content) {
	return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}

function createViaIFrame() {
	var iframe = document.createElement('iframe');
	var JS = 'java' + SCRIPT + ':';
	iframe.style.display = 'none';
	document.documentElement.appendChild(iframe);
	iframe.src = String(JS);
	var iframeDocument = iframe.contentWindow.document;
	iframeDocument.open();
	iframeDocument.write(scriptTag('document.F=Object'));
	iframeDocument.close();
	return iframeDocument.F;
}

function clearProto(Ctor) {
	var proto = Ctor.prototype;
	var i = dontEnums.length;
	while(i--) delete proto[dontEnums[i]];
	delete proto.constructor;
	return proto;
}

export var isNullBase = function isNullBase() {
	return false;
};

export var getNullProto = function getNullProto() {
	var Ctor = createViaIFrame();
	var proto = clearProto(Ctor);
	getNullProto = function() {
		return proto;
	};
	isNullBase = function(obj) {
		return obj instanceof Ctor;
	};
	return proto;
};
