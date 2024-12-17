import { definePrototype } from "sky-core/utils/definePrototype";
import { withAt } from "../../../impl/Array/prototype/with";

definePrototype(Array, 'with', withAt);