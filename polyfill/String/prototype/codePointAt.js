import { definePrototype } from "sky-core/utils/definePrototype";
import { codePointAt } from "../../../impl/String/prototype/codePointAt";

definePrototype(String, 'codePointAt', codePointAt);