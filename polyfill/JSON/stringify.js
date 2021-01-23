
import { stringify } from "../impl/JSON/stringify";
if(!this.JSON) {
	this.JSON = new Object();
}
if(!JSON.stringify) {
	JSON.stringify = stringify;
}