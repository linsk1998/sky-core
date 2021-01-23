
import { parse } from "../impl/JSON/parse";
if(!this.JSON) {
	this.JSON = new Object();
}
if(!JSON.parse) {
	JSON.parse = parse;
}