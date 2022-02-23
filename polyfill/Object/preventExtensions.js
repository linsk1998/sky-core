import { preventExtensions } from "../../impl/Object/preventExtensions";

if(!Object.preventExtensions) {
	Object.preventExtensions = preventExtensions;
}