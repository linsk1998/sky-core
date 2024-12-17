import { definePrototype } from "sky-core/utils/definePrototype";
import { includes } from "../../../impl/String/prototype/includes";

definePrototype(String, 'includes', includes);