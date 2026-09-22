import { definePrototype } from "sky-core/utils/definePrototype";
import { reduce } from "../../../impl/Array/prototype/reduce";

definePrototype(Array, 'reduce', reduce);