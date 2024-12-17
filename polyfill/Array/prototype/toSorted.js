import { definePrototype } from "sky-core/utils/definePrototype";
import { toSorted } from "../../../impl/Array/prototype/toSorted";

definePrototype(Array, 'toSorted', toSorted);