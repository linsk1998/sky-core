
import { stringify } from "../impl/JSON/stringify";
if(!globalThis.JSON) {
	globalThis.JSON = new Object();
}
if(!JSON.stringify) {
	JSON.stringify = stringify;
}