import { definePrototype } from "sky-core/utils/definePrototype";
import { bind } from "../../../impl/Function/prototype/bind";

definePrototype(Function, 'bind', bind);