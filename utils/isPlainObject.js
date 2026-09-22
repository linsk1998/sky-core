import { proto } from "../support/proto";
import { isPlainObject as compat_isPlainObject } from "../utils-compat/isPlainObject";
import { isPlainObject as modern_isPlainObject } from "../utils-modern/isPlainObject";

export var isPlainObject = proto ? modern_isPlainObject : compat_isPlainObject;