
import {getOwnPropertyNames as compat_getOwnPropertyNames} from "../../impl-compat/Object/getOwnPropertyNames";
import {getOwnPropertyNames as modern_getOwnPropertyNames} from "../../impl-modern/Object/getOwnPropertyNames";

export var getOwnPropertyNames=Object.getOwnPropertyNames || (Object.prototype.__defineSetter__?modern_getOwnPropertyNames:compat_getOwnPropertyNames);