import { definePrototype } from "sky-core/utils/definePrototype";
import { flatMap } from "../../../impl/Array/prototype/flatMap";

definePrototype(Array, 'flatMap', flatMap);