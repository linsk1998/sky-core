import { JSON } from "../../native/JSON";
import { parse } from "../../impl/JSON/parse";

if(!JSON) {
	window.JSON = JSON = {};
}
if(!JSON.parse) {
	JSON.parse = parse;
}