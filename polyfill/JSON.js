import { parse } from "../impl/JSON/parse";
import { stringify } from "../impl/JSON/stringify";
if(!this.JSON) {
	this.JSON = {
		stringify: stringify,
		parse: parse
	};
}