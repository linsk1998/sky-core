import { definePrototype } from "sky-core/utils/definePrototype";
import { toISOString } from "../../../impl/Date/prototype/toISOString";

definePrototype(Date, 'toISOString', toISOString);