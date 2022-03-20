import { Object } from "../../native/Object";
import { compat_defineProperty, ie8_defineProperty } from "../../impl-compat/Object/defineProperty";

if(Object.defineProperty) {
	Object.defineProperty = ie8_defineProperty;
} else {
	Object.defineProperty = compat_defineProperty;
}
Object.defineProperty.sham = true;