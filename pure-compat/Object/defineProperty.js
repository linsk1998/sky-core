import {compat_defineProperty,ie8_defineProperty} from "../../impl-compat/Object/defineProperty";

export var defineProperty=Object.defineProperty?ie8_defineProperty:compat_defineProperty;