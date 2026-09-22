import { Reflect } from "../Reflect";
import { apply } from "../../impl/Reflect/apply";

if(!Reflect.apply) {
	Reflect.apply = apply;
}