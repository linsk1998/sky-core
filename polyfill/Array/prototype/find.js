import { definePrototype } from "sky-core/utils/definePrototype";
import { find } from "../../../impl/Array/prototype/find";

definePrototype(Array, 'find', find);