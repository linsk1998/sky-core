import { JSON } from "../native/JSON";
import { nonEnumerable } from "../support/nonEnumerable";
import { stringify } from "../impl-compat/JSON/stringify";
import { parse } from "../impl-compat/JSON/parse";
import { fix_stringify } from "../impl-modern/JSON/stringify";

if(!JSON) {
	window.JSON = {
		stringify: stringify,
		parse: parse
	};
} else if(!nonEnumerable) {
	JSON.stringify = fix_stringify(JSON.stringify);
}