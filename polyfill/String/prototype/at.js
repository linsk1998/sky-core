import { definePrototype } from "sky-core/utils/definePrototype";
import { at } from "../../../impl/String/prototype/at";

definePrototype(String, 'at', at);