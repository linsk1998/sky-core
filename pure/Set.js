import { Symbol } from "sky-core/pure/Symbol";
import { Set as GSet } from "../native/Set";
import { Set as modern_Set } from "../impl-modern/Set";
import { Set as compat_Set } from "../impl-compat/Set";
export var Set = (GSet && modern_Set.prototype[Symbol.iterator]) ? modern_Set : compat_Set;