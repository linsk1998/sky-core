import { definePrototype } from "sky-core/utils/definePrototype";
import { map } from "../../../impl/Array/prototype/map";

definePrototype(Array, 'map', map);