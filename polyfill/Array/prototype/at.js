import { definePrototype } from "sky-core/utils/definePrototype";
import { at } from "../../../impl/Array/prototype/at";

definePrototype(Array, 'at', at);