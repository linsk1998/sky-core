import { Set } from "../../../polyfill/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { difference } from "../../../impl/Set/prototype/difference$ie11";

definePrototype(Set, 'difference', difference);
