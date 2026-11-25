import { Reflect } from "../Reflect";
import { isExtensible } from "../../impl/Reflect/isExtensible";

if(!Reflect.isExtensible) {
	Reflect.isExtensible = isExtensible;
}
