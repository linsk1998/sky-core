import { JSON } from "../native/JSON";
import { parse } from "../impl/JSON/parse";
import { stringify } from "../impl/JSON/stringify";
if(!JSON) {
	this.JSON = {
		stringify: stringify,
		parse: parse
	};
}