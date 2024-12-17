import { definePrototype } from "sky-core/utils/definePrototype";
import { fill } from "../../../impl/Array/prototype/fill";

definePrototype(Array, 'fill', fill);
