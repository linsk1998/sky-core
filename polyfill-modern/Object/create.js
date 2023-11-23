import { Object } from "../../native/Object";
import { create } from "../../impl-modern/Object/create";
if(!Object.create) {
	if('__proto__' in Object.prototype) {
		Object.create = create;
	}
}