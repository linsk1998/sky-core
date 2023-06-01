import "sky-core/polyfill/document/head";
if(window.HTMLElement) {
	if(!('children' in document.head)) {
		HTMLElement.prototype.__defineGetter__("children", function() {
			var a = [];
			for(var i = 0; i < this.childNodes.length; i++) {
				var n = this.childNodes[i];
				if(n.nodeType == 1) {
					a.push(n);
				}
			}
			return a;
		});
	}
}