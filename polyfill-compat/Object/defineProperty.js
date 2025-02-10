import { Object } from "../../native/Object";
import { defineProperty } from "../../native/Object/defineProperty";
import { compat_defineProperty, ie8_defineProperty } from "../../impl-compat/Object/defineProperty";

if(defineProperty) {
	Object.defineProperty = ie8_defineProperty;
} else {
	Object.defineProperty = compat_defineProperty;
}