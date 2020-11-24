
import {getPrototypeOf as modern_getPrototypeOf} from "../../impl-modern/Object/getPrototypeOf";
import {getPrototypeOf as compat_getPrototypeOf} from "../../impl-compat/Object/getPrototypeOf";
export var getPrototypeOf=Object.getPrototypeOf || (('__proto__' in Object.prototype)?modern_getPrototypeOf:compat_getPrototypeOf);