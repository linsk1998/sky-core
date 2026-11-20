import { Set } from "../../../polyfill-compat/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { isSupersetOf } from "../../../impl/Set/prototype/isSupersetOf";

definePrototype(Set, 'isSupersetOf', isSupersetOf);
