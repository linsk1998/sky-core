import { definePrototype } from "sky-core/utils/definePrototype";
import { some } from "../../../impl/Array/prototype/some";

definePrototype(Array, 'some', some);