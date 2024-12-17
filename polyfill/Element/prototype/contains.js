var k = 'contains', p = window.Element;
if(window.Element) {
	p = p.prototype;
	/** 判断一个节点后代是否包含另一个节点 **/
	if(!(k in p) && p.compareDocumentPosition) {
		p[k] = function(arg) {
			return !!(this.compareDocumentPosition(arg) & 16);
		};
	}
}