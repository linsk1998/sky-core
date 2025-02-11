export var getInnerWidth = 'innerWidth' in window ? function() {
	return window.innerWidth;
} : function() {
	return document.scrollingElement.clientWidth;
};