import { Set } from "../../../polyfill-compat/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { isDisjointFrom } from "../../../impl/Set/prototype/isDisjointFrom";

definePrototype(Set, 'isDisjointFrom', isDisjointFrom);
