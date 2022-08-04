
import { construct } from "../../impl/Reflect/construct";
import { Reflect } from "../Reflect";

if(!Reflect.construct) {
	Reflect.construct = construct;
}