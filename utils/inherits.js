import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.set-prototype-of";
import {compat_inherits} from "../impl-compat/Object/object-inherits";
import {modern_inherits} from "../impl-modern/Object/object-inherits";

export var inherits=-[1,]?modern_inherits:compat_inherits;