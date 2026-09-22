import { definePrototype } from "sky-core/utils/definePrototype";
import { endsWith } from "../../../impl/String/prototype/endsWith";

definePrototype(String, 'endsWith', endsWith);