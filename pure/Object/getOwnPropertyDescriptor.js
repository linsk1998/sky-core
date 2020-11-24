import {getOwnPropertyDescriptor as compat_getOwnPropertyDescriptor} from "../../impl-compat/Object/getOwnPropertyDescriptor";
import {getOwnPropertyDescriptor as modern_getOwnPropertyDescriptor} from "../../impl-modern/Object/getOwnPropertyDescriptor";

export var getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor || (Object.prototype.__defineSetter__?modern_getOwnPropertyDescriptor:compat_getOwnPropertyDescriptor);