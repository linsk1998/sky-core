
import { apply } from "../../impl/Reflect/apply";
import "../Reflect";

if(!Reflect.apply) {
	Reflect.apply = apply;
}