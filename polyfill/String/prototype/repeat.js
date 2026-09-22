import { definePrototype } from "sky-core/utils/definePrototype";
import { repeat } from "../../../impl/String/prototype/repeat";

definePrototype(String, 'repeat', repeat);