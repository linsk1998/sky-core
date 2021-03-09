
import { set as compat_set } from "../../impl-compat/Reflect/set";
import { set as modern_set } from "../../impl-modern/Reflect/set";
import { accessor } from "../../support/accessor";
import "../Reflect";

if(!Reflect.set) {
	Reflect.set = accessor ? modern_set : compat_set;
}