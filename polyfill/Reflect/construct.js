import { Reflect } from "../Reflect";
import { construct } from "../../impl/Reflect/construct";

if(!Reflect.construct) {
	Reflect.construct = construct;
}