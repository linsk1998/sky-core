import { JSON } from "../../native/JSON";
import { nonEnumerable } from "../../support/nonEnumerable";
import { stringify } from "../../impl/JSON/stringify";
import { fix_stringify } from "../../impl-modern/JSON/stringify";

if(!JSON) {
	window.JSON = JSON = new Object();
}
if(!JSON.stringify) {
	JSON.stringify = stringify;
} else if(!nonEnumerable) {
	JSON.stringify = fix_stringify(JSON.stringify);
}