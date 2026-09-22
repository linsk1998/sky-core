import { definePrototype } from "sky-core/utils/definePrototype";
import { findIndex } from "../../../impl/Array/prototype/findIndex";

definePrototype(Array, 'findIndex', findIndex);