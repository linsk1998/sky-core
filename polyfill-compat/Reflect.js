
import { apply } from "../impl/Reflect/apply";
import { construct } from "../impl/Reflect/construct";
import { defineProperty } from "../impl/Reflect/defineProperty";
import getPrototypeOf from "sky-core/pure/Object/getPrototypeOf";
import getOwnPropertyDescriptor from "sky-core/pure/Object/getOwnPropertyDescriptor";
import { set as compat_set } from "../impl-compat/Reflect/set";
import { get as compat_get } from "../impl-compat/Reflect/get";
import { deleteProperty as compat_deleteProperty } from "../impl-compat/Reflect/deleteProperty";

if(!this.Reflect) {
	this.Reflect = {
		apply: apply,
		construct: construct,
		defineProperty: defineProperty,
		getPrototypeOf: getPrototypeOf,
		getOwnPropertyDescriptor: getOwnPropertyDescriptor,
		set: compat_set,
		get: compat_get,
		deleteProperty: compat_deleteProperty
	};
}