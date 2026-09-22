
import { Symbol } from "../native/Symbol";
import { hasEnumBug } from "../utils/hasEnumBug";
import { forIn as compat_forIn } from "../utils-compat/forIn";
import { symbol_forIn, nosymbol_forIn } from "../utils-modern/forIn";

export var forIn = Symbol ? symbol_forIn : (hasEnumBug ? compat_forIn : nosymbol_forIn);