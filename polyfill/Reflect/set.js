import { Reflect } from "../Reflect";
import { set } from "../../impl/Reflect/set";

if(!Reflect.set) {
	Reflect.set = set;
}
