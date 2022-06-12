import { Object } from "../../native/Object";
import { create as compat_create } from "../../impl-compat/Object/create";
if(!Object.create) {
	Object.create = compat_create;
}