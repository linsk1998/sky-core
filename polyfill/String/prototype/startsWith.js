import { definePrototype } from "sky-core/utils/definePrototype";
import { startsWith } from "../../../impl/String/prototype/startsWith";

definePrototype(String, 'startsWith', startsWith);