import {defineProperty as modern_defineProperty} from "../../impl-modern/Object/defineProperty";
import {compat_defineProperty,ie8_defineProperty} from "../../impl-compat/Object/defineProperty";

export var defineProperty=Object.defineProperties?Object.defineProperty:(
	Object.defineProperty?(
		Object.prototype.__defineSetter__?
		modern_defineProperty:
		compat_defineProperty
	):
	ie8_defineProperty
);