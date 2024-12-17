import { document } from "../../native/document";

if(!document.baseURI) {
	var base = document.getElementsByName("BASE");
	if(base && base.length) {
		document.baseURI = base[0].href;
	}
	document.baseURI = location.href;
}