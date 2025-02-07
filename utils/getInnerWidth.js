import scrollingElement from "sky-core/pure/document/scrollingElement";

export var getInnerWidth = 'innerWidth' in document ? function() {
	return document.innerWidth;
} : function() {
	return scrollingElement.clientWidth;
};