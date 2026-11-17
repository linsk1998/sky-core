import { Set } from "../../../polyfill/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { union } from "../../../impl/Set/prototype/union";

definePrototype(Set, 'union', union);
