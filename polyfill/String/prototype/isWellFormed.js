import { definePrototype } from "sky-core/utils/definePrototype";
import { isWellFormed } from "../../../impl/String/prototype/isWellFormed";

definePrototype(String, 'isWellFormed', isWellFormed);