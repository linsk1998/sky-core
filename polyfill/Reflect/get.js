import { Reflect } from "../Reflect";
import { get } from "../../impl/Reflect/get";

if(!Reflect.get) {
	Reflect.get = get;
}
