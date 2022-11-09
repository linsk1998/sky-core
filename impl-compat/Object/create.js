import { dontEnums } from "../../utils-compat/dontEnums";

// from core-js
var GT = '>';
var LT = '<';
var SCRIPT = 'script';

function scriptTag(content) {
	return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
function NullProtoObjectViaActiveX(activeXDocument) {
	activeXDocument.write(scriptTag(''));
	activeXDocument.close();
	var temp = activeXDocument.parentWindow.Object;
	activeXDocument = null; // avoid memory leak
	return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
function NullProtoObjectViaIFrame() {
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

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function() {
	try {
		/* global ActiveXObject -- old IE */
		activeXDocument = document.domain && new ActiveXObject('htmlfile');
	} catch(error) { /* ignore */ }
	NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	var i = dontEnums.length;
	while(i--) delete NullProtoObject.prototype[dontEnums[i]];
	return NullProtoObject();
};


function F() { /* empty */ };
export function create(proto, properties) {
	var o;
	if(proto !== null) {
		F.prototype = proto;
		var o = new F();
		F.prototype = null;
	} else {
		o = NullProtoObject();
	}
	o.__proto__ = proto;
	if(properties) {
		Object.defineProperties(o, properties);
	}
	return o;
};
create.sham = true;