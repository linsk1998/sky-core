import { definePrototype } from "sky-core/utils/definePrototype";
import { toReversed } from "../../../impl/Array/prototype/toReversed";

definePrototype(Array, 'toReversed', toReversed);