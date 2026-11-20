import { Set } from "../../Set";
import { definePrototype } from "sky-core/utils/definePrototype";
import { isDisjointFrom } from "../../../impl/Set/prototype/isDisjointFrom$ie11";

definePrototype(Set, 'isDisjointFrom', isDisjointFrom);
