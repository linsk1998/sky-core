import { definePrototype } from "sky-core/utils/definePrototype";
import { toWellFormed } from "../../../impl/String/prototype/toWellFormed";

definePrototype(String, 'toWellFormed', toWellFormed);