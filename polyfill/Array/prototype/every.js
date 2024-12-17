import { definePrototype } from "sky-core/utils/definePrototype";
import { every } from "../../../impl/Array/prototype/every";

definePrototype(Array, 'every', every);