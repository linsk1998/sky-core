if(window.Element) {
	/** 判断一个节点后代是否包含另一个节点 **/
	if(!Element.prototype.contains && Element.prototype.compareDocumentPosition) {
		Element.prototype.contains = function(arg) {
			return !!(this.compareDocumentPosition(arg) & 16);
		};
	}
}