import { definePrototype } from "sky-core/utils/definePrototype";
import { lastIndexOf } from "../../../impl/Array/prototype/lastIndexOf";

definePrototype(Array, 'lastIndexOf', lastIndexOf);