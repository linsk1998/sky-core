if(this.HTMLElement) {
	if(!('innerText' in document.head)) {
		HTMLElement.prototype.__defineGetter__("innerText", function() {
			var anyString = "";
			var childS = this.childNodes;
			for(var i = 0; i < childS.length; i++) {
				var node = childS[i];
				if(node.nodeType == 1) {
					switch(node.tagName) {
						case "BR":
							anyString += '\n';
							break;
						case "SCRIPT":
						case "STYLE":
						case "TEMPLATE":
							break;
						default:
							anyString += node.innerText;
					}
				} else if(node.nodeType == 3) {
					var nodeValue = node.nodeValue;
					if(i == 0)
						nodeValue = nodeValue.trimLeft();
					if(i == childS.length - 1)
						nodeValue = nodeValue.trimRight();
					if(i > 0 && i < childS.length - 1) {
						if(nodeValue.match(/^\s+$/)) {
							if(checkBlock(childS[i - 1]) || checkBlock(childS[i + 1])) {
								nodeValue = "\n";
							}
						}
					}
					anyString += nodeValue;
				}
			}
			return anyString.trim();
		});
		function checkBlock(node) {
			switch(node.tagName) {
				case "BR":
				case "SPAN":
				case "I":
				case "U":
				case "B":
				case "FONT":
					return false;
			}
			return true;
		}
		HTMLElement.prototype.__defineSetter__("innerText", function(sText) {
			this.textContent = sText;
		});
	}
}