import { document } from "../../native/document";
import { contains$all } from "../../impl/document/contains$all";
if(!document.contains && 'all' in document) {
	document.contains = contains$all;
}
