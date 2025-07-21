import { Object } from "../../native/Object";
import { preventExtensions as native_preventExtensions } from "../../native/Object/preventExtensions";
import { preventExtensions } from "../../impl/Object/preventExtensions";

if(!native_preventExtensions) {
	Object.preventExtensions = preventExtensions;
}