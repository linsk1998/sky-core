import { definePrototype } from "sky-core/utils/definePrototype";
import { trim } from "../../../impl/String/prototype/trim";

definePrototype(String, 'trim', trim);