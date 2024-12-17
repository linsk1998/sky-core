import { definePrototype } from "sky-core/utils/definePrototype";
import { reduceRight } from "../../../impl/Array/prototype/reduceRight";

definePrototype(Array, 'reduceRight', reduceRight);