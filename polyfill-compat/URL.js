
import { URL, initURL } from "../impl-compat/URL";
if(!this.URL) {
	initURL();
	this.URL = URL;
}