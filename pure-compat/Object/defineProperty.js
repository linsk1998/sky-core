import { compat_defineProperty, ie8_defineProperty } from "../../impl-compat/Object/defineProperty";
export default Object.defineProperty ? ie8_defineProperty : compat_defineProperty;