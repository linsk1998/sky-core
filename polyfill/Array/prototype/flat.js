import { definePrototype } from "sky-core/utils/definePrototype";
import { flat } from "../../../impl/Array/prototype/flat";

definePrototype(Array, 'flat', flat);
