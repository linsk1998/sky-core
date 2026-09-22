import { definePrototype } from "sky-core/utils/definePrototype";
import { trimEnd } from "../../../impl/String/prototype/trimEnd";

definePrototype(String, 'trimRight', trimEnd);