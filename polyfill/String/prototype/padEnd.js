import { definePrototype } from "sky-core/utils/definePrototype";
import { padEnd } from "../../../impl/String/prototype/padEnd";

definePrototype(String, 'padEnd', padEnd);