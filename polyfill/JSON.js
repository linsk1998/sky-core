import { JSON } from "../native/JSON";
import { stringify } from "../impl-compat/JSON/stringify";
if(!JSON) {
	window.JSON = {
		stringify: stringify,
		parse: new Function("json", "return eval('(' + json + ')')")
	};
}