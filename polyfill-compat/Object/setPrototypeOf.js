import { Object } from "../../native/Object";
import { proto } from "../../support/proto";
import { setPrototypeOf } from "../../impl-compat/Object/setPrototypeOf";
if(!proto) {
	Object.setPrototypeOf = setPrototypeOf;
}