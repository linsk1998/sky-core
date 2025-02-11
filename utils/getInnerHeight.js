export var getInnerHeight = 'innerHeight' in window ? function() {
	return window.innerHeight;
} : function() {
	return document.scrollingElement.clientHeight;
};