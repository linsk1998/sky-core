import { definePrototype } from "sky-core/utils/definePrototype";
import { matchAll } from "../../../impl/String/prototype/matchAll";

definePrototype(String, 'matchAll', matchAll);