import { Object } from "../../native/Object";
import { create } from "../../native/Object/create";
import { create as compat_create } from "../../impl-compat/Object/create";

if(!create) {
	Object.create = compat_create;
}