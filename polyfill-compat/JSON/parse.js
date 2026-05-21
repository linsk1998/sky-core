import { JSON } from "../../native/JSON";
if(!JSON) {
	window.JSON = JSON = {};
}
if(!JSON.parse) {
	JSON.parse = new Function("json", "return eval('(' + json + ')')");
}