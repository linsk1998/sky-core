import scrollingElement from "sky-core/pure/document/scrollingElement";

export var getInnerHeight = 'innerHeight' in document ? function() {
	return document.innerHeight;
} : function() {
	return scrollingElement.clientHeight;
};