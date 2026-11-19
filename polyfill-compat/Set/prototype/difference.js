import { Set } from "../../../polyfill-compat/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { difference } from "../../../impl/Set/prototype/difference";

definePrototype(Set, 'difference', difference);
