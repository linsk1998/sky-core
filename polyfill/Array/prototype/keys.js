import { definePrototype } from "sky-core/utils/definePrototype";
import { keys } from "../../../impl/Array/prototype/keys";

definePrototype(Array, 'keys', keys);