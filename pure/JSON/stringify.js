import { JSON } from "../../native/JSON";
import { nonEnumerable } from "../../support/nonEnumerable";
import { stringify } from "../../impl/JSON/stringify";
import { fix_stringify } from "../../impl/JSON/fix_stringify";

export default !JSON ?
	stringify :
	nonEnumerable ?
		fix_stringify(JSON.stringify) :
		JSON.stringify;