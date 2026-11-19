import { Set } from "../../../polyfill/Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { symmetricDifference } from "../../../impl/Set/prototype/symmetricDifference$ie11";

definePrototype(Set, 'symmetricDifference', symmetricDifference);
