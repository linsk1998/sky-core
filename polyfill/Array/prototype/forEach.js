import { definePrototype } from "sky-core/utils/definePrototype";
import { forEach } from "../../../impl/Array/prototype/forEach";

definePrototype(Array, 'forEach', forEach);