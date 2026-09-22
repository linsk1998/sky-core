import { definePrototype } from "sky-core/utils/definePrototype";
import { findLast } from "../../../impl/Array/prototype/findLast";

definePrototype(Array, 'findLast', findLast);