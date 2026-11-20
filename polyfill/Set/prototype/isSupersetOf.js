import { Set } from "../../Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { isSupersetOf } from "../../../impl/Set/prototype/isSupersetOf$ie11";

definePrototype(Set, 'isSupersetOf', isSupersetOf);
