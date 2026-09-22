import { dontEnums } from "../../utils-compat/dontEnums";

// from core-js
var GT = '>';
var LT = '<';
var SCRIPT = 'script';

export function scriptTag(content) {
	return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}

// Create object with fake `null` prototype: use iframe Object with cleared prototype
export function NullProtoObjectViaIFrame() {
	// Thrash, waste and sodomy: IE GC bug
	var iframe = documentCreateElement('iframe');
	var JS = 'java' + SCRIPT + ':';
	var iframeDocument;
	iframe.style.display = 'none';
	html.appendChild(iframe);
	// https://github.com/zloirock/core-js/issues/475
	iframe.src = String(JS);
	iframeDocument = iframe.contentWindow.document;
	iframeDocument.open();
	iframeDocument.write(scriptTag('document.F=Object'));
	iframeDocument.close();
	return iframeDocument.F;
};

export var NullProtoObject = function() {
	NullProtoObject = NullProtoObjectViaIFrame();
	var proto = NullProtoObject.prototype;
	var i = dontEnums.length;
	while(i--) delete proto[dontEnums[i]];
	delete proto.constructor;
	return NullProtoObject();
};
