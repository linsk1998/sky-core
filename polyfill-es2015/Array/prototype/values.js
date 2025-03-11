import { definePrototype } from "sky-core/utils/definePrototype";

definePrototype(Array, 'values', Array.prototype[Symbol.iterator]);