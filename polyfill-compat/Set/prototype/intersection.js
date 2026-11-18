import { Set } from "../../../polyfill-compat/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { intersection } from "../../../impl/Set/prototype/intersection";

definePrototype(Set, 'intersection', intersection);
