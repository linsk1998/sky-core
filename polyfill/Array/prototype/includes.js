import { definePrototype } from "sky-core/utils/definePrototype";
import { includes } from "../../../impl/Array/prototype/includes";

definePrototype(Array, 'includes', includes);