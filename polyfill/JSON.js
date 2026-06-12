import { JSON } from "../native/JSON";
import { nonEnumerable } from "../support/nonEnumerable";
import { stringify } from "../impl/JSON/stringify";
import { parse } from "../impl/JSON/parse";
import { fix_stringify } from "../impl/JSON/fix_stringify";

if(!JSON) {
	window.JSON = {
		stringify: stringify,
		parse: parse
	};
} else if(!nonEnumerable) {
	JSON.stringify = fix_stringify(JSON.stringify);
}