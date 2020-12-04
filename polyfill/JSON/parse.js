
import { parse } from "../impl/JSON/parse";
if(!globalThis.JSON) {
	globalThis.JSON = new Object();
}
if(!JSON.parse) {
	JSON.parse = parse;
}