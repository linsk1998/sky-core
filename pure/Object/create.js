import {create as modern_create} from "../../impl-modern/Object/create";
import {create as compat_create} from "../../impl-compat/Object/create";
export var create=Object.create || (('__proto__' in Object.prototype)?modern_create:compat_create);