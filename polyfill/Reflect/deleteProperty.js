import { Reflect } from "../Reflect";
import { accessor } from "../../support/accessor";
import { deleteProperty as compat_deleteProperty } from "../../impl-compat/Reflect/deleteProperty";
import { deleteProperty as modern_deleteProperty } from "../../impl-modern/Reflect/deleteProperty";

if(!Reflect.deleteProperty) {
	Reflect.deleteProperty = accessor ? modern_deleteProperty : compat_deleteProperty;
}