
import { construct } from "../../impl/Reflect/construct";
import "../Reflect";

if(!Reflect.construct) {
	Reflect.construct = construct;
}