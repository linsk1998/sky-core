import { URL } from "../native/URL";
import { initURL } from "../impl-compat/URL";
if(!URL) {
	window.URL = initURL();
}