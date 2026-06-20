import { Symbol } from "../../native/Symbol";
import { Object } from "../../native/Object";
import { keys as keys$jscript } from "../../impl/object/enum/keys$jscript";
import { keys$es3 } from "../../impl/object/enum/keys$es3";
import { keys$fixSymbol } from "../../impl/object/enum/keys$fixSymbol";
import { hasEnumBug } from "../../utils/hasEnumBug";

if(!Object.keys) {
	if(hasEnumBug) {
		Object.keys = keys$jscript;
	} else {
		Object.keys = keys$es3;
	}
} else if(!Symbol) {
	Object.keys = keys$fixSymbol;
}
