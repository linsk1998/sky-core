import { Object } from "../../native/Object";
import { create } from "../../impl-compat/Object/create";
if(!Object.create) {
	Object.create = create;
}