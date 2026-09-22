import { Reflect } from "../Reflect";
import { preventExtensions as native_preventExtensions } from "../../native/Object/preventExtensions";
import { preventExtensions, preventExtensions$object } from "../../impl/Reflect/preventExtensions";

if(!Reflect.preventExtensions) {
	if(native_preventExtensions) {
		Reflect.preventExtensions = preventExtensions$object;
	} else {
		Reflect.preventExtensions = preventExtensions;
	}
}