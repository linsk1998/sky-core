import { proto } from "../support/proto";
import { inherits as compat_inherits } from "../utils-compat/inherits";
import { inherits as modern_inherits } from "../utils-modern/inherits";

export var inherits = proto ? modern_inherits : compat_inherits;