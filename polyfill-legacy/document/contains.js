import { document } from "../../native/document";
import { contains$all } from "../../impl/document/contains$all";
import { contains$cmp } from "../../impl/document/contains$cmp";

if(window.HTMLDocument) {
	/** 判断一个节点后代是否包含另一个节点 **/
	if(!HTMLDocument.prototype.contains && HTMLDocument.prototype.compareDocumentPosition) {
		HTMLDocument.prototype.contains = contains$cmp;
	}
}
if(!document.contains && 'all' in document) {
	document.contains = contains$all;
}
