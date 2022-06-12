import { Object } from "../../native/Object";
import { create as compat_create } from "../../impl-compat/Object/create";
import { create as modern_create } from "../../impl-modern/Object/create";
if(!Object.create) {
	if('__proto__' in Object.prototype) {
		Object.create = modern_create;
	} else {
		Object.create = compat_create;
	}
}