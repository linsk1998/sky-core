import { definePrototype } from "sky-core/utils/definePrototype";
import { values } from "../../../impl/Array/prototype/values";

definePrototype(Array, 'values', values);