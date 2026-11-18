import { Set } from "../../../polyfill/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { intersection } from "../../../impl/Set/prototype/intersection$ie11";

definePrototype(Set, 'intersection', intersection);
