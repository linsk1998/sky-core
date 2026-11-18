import { Set } from "../../Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { union } from "../../../impl/Set/prototype/union$ie11";

definePrototype(Set, 'union', union);
