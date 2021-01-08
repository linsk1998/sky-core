
if(this.HTMLDocument) {
	/** 判断一个节点后代是否包含另一个节点 **/
	if(!HTMLDocument.prototype.contains && HTMLDocument.prototype.compareDocumentPosition) {
		HTMLDocument.prototype.contains = function(arg) {
			return !!(this.compareDocumentPosition(arg) & 16);
		};
	}
}