
import { apply } from "../../impl/Reflect/apply";
import { Reflect } from "../Reflect";

if(!Reflect.apply) {
	Reflect.apply = apply;
}