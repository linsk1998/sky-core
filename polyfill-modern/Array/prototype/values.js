import { definePrototype } from "sky-core/utils/definePrototype";
import { values } from "../../../impl/Array/prototype/values";

if(Symbol && Symbol.iterator) {
	definePrototype(Array, 'values', Array.prototype[Symbol.iterator]);
} else {
	definePrototype(Array, 'values', values);
}