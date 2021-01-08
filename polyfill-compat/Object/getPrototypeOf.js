import { getPrototypeOf } from "../../impl-compat/Object/getPrototypeOf";
if(!Object.getPrototypeOf) {
	Object.getPrototypeOf = getPrototypeOf;
}