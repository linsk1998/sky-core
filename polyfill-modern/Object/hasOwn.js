import { Object } from "../../native/Object";
import { hasOwn } from "../../impl-modern/Object/hasOwn";

if(!Object.hasOwn) {
	Object.hasOwn = hasOwn;
} 