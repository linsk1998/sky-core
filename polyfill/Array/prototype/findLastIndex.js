import { definePrototype } from "sky-core/utils/definePrototype";
import { findLastIndex } from "../../../impl/Array/prototype/findLastIndex";

definePrototype(Array, 'findLastIndex', findLastIndex);