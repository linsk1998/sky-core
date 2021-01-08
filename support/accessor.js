import {defineProperties} from "../native/Object/defineProperties";
export var accessor = !!defineProperties || !!Object.prototype.__defineSetter__;