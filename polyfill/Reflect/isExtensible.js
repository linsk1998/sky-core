import { Reflect } from "../../native/Reflect";
import { isExtensible as Object_isExtensible } from "../../native/Object/isExtensible";
import { isExtensible, isExtensible$object } from "../../impl/Reflect/isExtensible";

if(!Reflect.isExtensible) {
	if(Object_isExtensible) {
		Reflect.isExtensible = isExtensible$object;
	} else {
		Reflect.isExtensible = isExtensible;
	}
}