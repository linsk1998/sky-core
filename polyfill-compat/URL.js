import { URL } from "../native/URL";
import { initURL } from "../impl/URL/URL$vb";
if(!URL) {
	window.URL = initURL();
}
