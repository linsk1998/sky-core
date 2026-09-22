import { document } from "../../native/document";
import { contains } from "../../impl-compat/document/contains";
if(!document.contains && 'all' in document) {
	document.contains = contains;
}