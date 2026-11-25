import { Reflect } from "../Reflect";
import { preventExtensions } from "../../impl/Reflect/preventExtensions";

if(!Reflect.preventExtensions) {
	Reflect.preventExtensions = preventExtensions;
}
