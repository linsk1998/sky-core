import { document } from "../../native/document";
import { contains } from "../../impl/document/contains";
if(!document.contains && 'all' in document) {
	document.contains = contains;
}
