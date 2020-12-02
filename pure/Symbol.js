
import { Symbol as compat_Symbol } from "../impl-compat/Symbol";
import { Symbol as modern_Symbol } from "../impl-modern/Symbol";

import { Symbol as native_Symbol } from "../native/Symbol";

export var Symbol = native_Symbol ? modern_Symbol : compat_Symbol;