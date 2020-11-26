import "sky-core/polyfill/globalThis";
import { apply } from "../impl/Reflect/apply";
import { construct } from "../impl/Reflect/construct";
import { defineProperty } from "../impl/Reflect/defineProperty";
import { getPrototypeOf } from "sky-core/pure/Object/getPrototypeOf";
import { getOwnPropertyDescriptor } from "sky-core/pure/Object/getOwnPropertyDescriptor";
import { set as modern_set } from "../impl-modern/Reflect/set";
import { get as modern_get } from "../impl-modern/Reflect/get";
import { deleteProperty as modern_deleteProperty } from "../impl-modern/Reflect/deleteProperty";

if(!globalThis.Reflect) {
	globalThis.Reflect = {
		apply: apply,
		construct: construct,
		defineProperty: defineProperty,
		getPrototypeOf: getPrototypeOf,
		getOwnPropertyDescriptor: getOwnPropertyDescriptor,
		set: modern_set,
		get: modern_get,
		deleteProperty: modern_deleteProperty
	};
}