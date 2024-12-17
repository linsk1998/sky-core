import { definePrototype } from "sky-core/utils/definePrototype";
import { trimStart } from "../../../impl/String/prototype/trimStart";

definePrototype(String, 'trimStart', trimStart);