export function contains(ele) {
	// 从 ele 沿 parentNode 向上走：能到达 document 即为后代；
	// ele 为 document 自身、任意类型后代节点（含文本节点）时同样成立
	var node = ele;
	while(node) {
		if(node === document) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}
