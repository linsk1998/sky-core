import { Set } from "../../../polyfill-compat/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { symmetricDifference } from "../../../impl/Set/prototype/symmetricDifference";

definePrototype(Set, 'symmetricDifference', symmetricDifference);
