
if(window.Node) {
	if(!('parentElement' in document.head)) {
		Node.prototype.__defineGetter__("parentElement", function() {
			var parent = this.parentNode;
			if(parent && parent.nodeType === 1) {
				return parent;
			}
			return null;
		});
	}
}