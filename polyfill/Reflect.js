import "sky-core/polyfill/globalThis";
import { apply } from "../impl/Reflect/apply";
import { construct } from "../impl/Reflect/construct";
import { defineProperty } from "../impl/Reflect/defineProperty";
import { getPrototypeOf } from "sky-core/pure/Object/getPrototypeOf";
import { getOwnPropertyDescriptor } from "sky-core/pure/Object/getOwnPropertyDescriptor";
import { set as compat_set } from "../impl-compat/Reflect/set";
import { get as compat_get } from "../impl-compat/Reflect/get";
import { deleteProperty as compat_deleteProperty } from "../impl-compat/Reflect/deleteProperty";
import { set as modern_set } from "../impl-modern/Reflect/set";
import { get as modern_get } from "../impl-modern/Reflect/get";
import { deleteProperty as modern_deleteProperty } from "../impl-modern/Reflect/deleteProperty";
import { supportAccessor } from "../utils/supportAccessor";

if(!globalThis.Reflect) {
	globalThis.Reflect = {
		apply: apply,
		construct: construct,
		defineProperty: defineProperty,
		getPrototypeOf: getPrototypeOf,
		getOwnPropertyDescriptor: getOwnPropertyDescriptor,
		set: supportAccessor ? modern_set : compat_set,
		get: supportAccessor ? modern_get : compat_get,
		deleteProperty: supportAccessor ? modern_deleteProperty : compat_deleteProperty
	};
}