import { Reflect } from "../Reflect";
import { deleteProperty } from "../../impl/Reflect/deleteProperty";

if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = deleteProperty;
}
