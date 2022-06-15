
import { stringify } from "../impl/JSON/stringify";
var JSON = this.JSON;
if(!JSON) {
	this.JSON = JSON = new Object();
}
if(!JSON.stringify) {
	JSON.stringify = stringify;
}