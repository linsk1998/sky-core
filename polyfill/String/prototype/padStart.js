import { definePrototype } from "sky-core/utils/definePrototype";
import { padStart } from "../../../impl/String/prototype/padStart";

definePrototype(String, 'padStart', padStart);
