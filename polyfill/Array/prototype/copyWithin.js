import { definePrototype } from "sky-core/utils/definePrototype";
import { copyWithin } from "../../../impl/Array/prototype/copyWithin";

definePrototype(Array, 'copyWithin', copyWithin);