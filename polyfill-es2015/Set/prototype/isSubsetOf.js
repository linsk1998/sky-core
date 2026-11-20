import { definePrototype } from "sky-core/utils/definePrototype";
import { isSubsetOf } from "../../../impl/Set/prototype/isSubsetOf";

definePrototype(Set, 'isSubsetOf', isSubsetOf);
