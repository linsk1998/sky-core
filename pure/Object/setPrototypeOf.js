import {setPrototypeOf as modern_setPrototypeOf} from "../../impl-modern/Object/setPrototypeOf";
import {setPrototypeOf as compat_setPrototypeOf} from "../../impl-compat/Object/setPrototypeOf";
export var setPrototypeOf=Object.setPrototypeOf || (('__proto__' in Object.prototype)?modern_setPrototypeOf:compat_setPrototypeOf);