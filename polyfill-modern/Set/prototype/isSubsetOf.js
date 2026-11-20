import { Set } from "../../../polyfill/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { isSubsetOf } from "../../../impl/Set/prototype/isSubsetOf$ie11";

definePrototype(Set, 'isSubsetOf', isSubsetOf);
