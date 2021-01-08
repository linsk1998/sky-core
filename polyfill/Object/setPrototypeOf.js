import { setPrototypeOf as modern_setPrototypeOf } from "../../impl-modern/Object/setPrototypeOf";
if(!Object.setPrototypeOf) {
	if('__proto__' in Object.prototype) {
		Object.setPrototypeOf = modern_setPrototypeOf;
	}
}