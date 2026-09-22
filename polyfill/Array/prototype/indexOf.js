import { definePrototype } from "sky-core/utils/definePrototype";
import { indexOf } from "../../../impl/Array/prototype/indexOf";

definePrototype(Array, 'indexOf', indexOf);