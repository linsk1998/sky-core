import { definePrototype } from "sky-core/utils/definePrototype";
import { toReversed } from "../../../impl-compat/Array/prototype/toReversed";

definePrototype(Array, 'toReversed', toReversed);