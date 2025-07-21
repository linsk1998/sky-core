import { ownKeys } from "../../impl-compat/Reflect/ownKeys";
import { Reflect } from "../../polyfill/Reflect";

if(!Reflect.ownKeys) {
	Reflect.ownKeys = ownKeys;
}