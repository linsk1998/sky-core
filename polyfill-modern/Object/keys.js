import { Object } from "../../native/Object";
import { Symbol } from "../../native/Symbol";
import { keys$es3 } from "../../impl/object/enum/keys$es3";
import { keys$fixSymbol } from "../../impl/object/enum/keys$fixSymbol";

if(!Object.keys) {
	Object.keys = keys$es3;
} else if(!Symbol) {
	Object.keys = keys$fixSymbol;
}
