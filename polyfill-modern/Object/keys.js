import { Object } from "../../native/Object";
import { Symbol } from "../../native/Symbol";
import { keys$fixSymbol } from "../../impl/object/enum/keys$fixSymbol";

if(!Symbol) {
	Object.keys = keys$fixSymbol;
}
