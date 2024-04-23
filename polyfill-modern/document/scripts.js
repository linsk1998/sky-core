import { document } from "../../native/document";
if(!document.scripts) {
	document.scripts = document.getElementsByTagName("script");
}