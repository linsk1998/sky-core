import { Object } from "../../native/Object";
import { hasOwn } from "../../impl-compat/Object/hasOwn";

if(!Object.hasOwn) {
	Object.hasOwn = hasOwn;
} 