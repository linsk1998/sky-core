
import { parse } from "../impl/JSON/parse";
var JSON = this.JSON;
if(!JSON) {
	this.JSON = JSON = new Object();
}
if(!JSON.parse) {
	JSON.parse = parse;
}