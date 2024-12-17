import { definePrototype } from "sky-core/utils/definePrototype";
import { entries } from "../../../impl/Array/prototype/entries";

definePrototype(Array, 'entries', entries);