import { setPrototypeOf } from "../native/Object/setPrototypeOf";
export var proto = !!setPrototypeOf || ('__proto__' in Object.prototype);