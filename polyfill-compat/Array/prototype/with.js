import { definePrototype } from "sky-core/utils/definePrototype";
import { withAt } from "../../../impl-compat/Array/prototype/with";

definePrototype(Array, 'with', withAt);