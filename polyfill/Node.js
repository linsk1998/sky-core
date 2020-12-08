import { head } from "sky-core/pure/document/head";
if(this.Node) {
	if(!('parentElement' in head)) {
		Node.prototype.__defineGetter__("parentElement", function() {
			var parent = this.parentNode;
			if(parent && parent.nodeType === 1) {
				return parent;
			}
			return null;
		});
	}
	/** 判断一个节点后代是否包含另一个节点 **/
	if(!Node.prototype.contains && Node.prototype.compareDocumentPosition) {
		Node.prototype.contains = function(arg) {
			return !!(this.compareDocumentPosition(arg) & 16);
		};
	}
}