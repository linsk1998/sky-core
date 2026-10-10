import { Object } from "../../native/Object";
import { create } from "../../native/Object/create";
import { create$jscript } from "../../impl/object/proto/create$jscript";

if(!create) {
	Object.create = create$jscript;
}
