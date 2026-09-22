import { Reflect } from "../Reflect";
import { accessor } from "../../support/accessor";
import { get as compat_get } from "../../impl-compat/Reflect/get";
import { get as modern_get } from "../../impl-modern/Reflect/get";

if(!Reflect.get) {
	Reflect.get = accessor ? modern_get : compat_get;
}