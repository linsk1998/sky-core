import { JSON } from "../native/JSON";
import { stringify } from "../impl/JSON/stringify";
if(!JSON) {
	this.JSON = {
		stringify: stringify,
		parse: new Function("json", "return eval('(' + json + ')')")
	};
}