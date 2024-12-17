import { definePrototype } from "sky-core/utils/definePrototype";
import { filter } from "../../../impl/Array/prototype/filter";

definePrototype(Array, 'filter', filter);