import "sky-core/polyfill/document.head";
if(window.Element){
	/** 判断一个节点后代是否包含另一个节点 **/
	if(!Element.prototype.contains && Element.prototype.compareDocumentPosition){
		Element.prototype.contains=function(arg){
			return !!(this.compareDocumentPosition(arg) & 16);
		}
	}
}
if(window.Node){
	if(!('parentElement' in document.head)){
		Node.prototype.__defineGetter__("parentElement", function() {
			var parent=this.parentNode;
			if(parent && parent.nodeType===1){
				return parent;
			}
			return null;
		});
	}
}