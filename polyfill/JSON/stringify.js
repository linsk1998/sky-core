import { JSON } from "../../native/JSON";
import { stringify } from "../impl/JSON/stringify";
if(!JSON) {
	window.JSON = JSON = new Object();
}
if(!JSON.stringify) {
	JSON.stringify = stringify;
}