import { definePrototype } from "sky-core/utils/definePrototype";
import { toSpliced } from "../../../impl-compat/Array/prototype/toSpliced";

definePrototype(Array, 'toSpliced', toSpliced);