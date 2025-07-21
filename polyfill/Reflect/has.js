import { Reflect } from "../Reflect";
import { has } from "../../impl/Reflect/has";

if(!Reflect.has) {
	Reflect.has = has;
}