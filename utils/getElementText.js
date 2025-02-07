export function getElementText(el) {
	var anyString = '';
	var childS = el.childNodes;
	for(var i = 0; i < childS.length; i++) {
		var node = childS[i];
		if(node.nodeType == 1) {
			anyString += node.innerText;
		} else if(node.nodeType == 3) {
			anyString += node.nodeValue;
		}
	}
	return anyString;
}