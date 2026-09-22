import { definePrototype } from "sky-core/utils/definePrototype";
import { replaceAll } from "../../../impl/String/prototype/replaceAll";

definePrototype(String, 'replaceAll', replaceAll);