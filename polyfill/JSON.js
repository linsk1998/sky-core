import { parse } from "../impl/JSON/parse";
import { stringify } from "../impl/JSON/stringify";
if(!globalThis.JSON) {
	globalThis.JSON = {
		stringify: stringify,
		parse: parse
	};
}