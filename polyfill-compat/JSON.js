import { JSON } from "../native/JSON";
import { stringify } from "../impl/JSON/stringify";
import { parse } from "../impl/JSON/parse";

if(!JSON) {
	window.JSON = {
		stringify: stringify,
		parse: parse
	};
}