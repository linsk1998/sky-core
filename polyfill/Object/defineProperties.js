import { Object } from "../../native/Object";
import { defineProperties } from "../../native/Object/defineProperties";
import { defineProperties as impl_defineProperties } from "../../impl/Object/defineProperties";

if(!defineProperties) {
	Object.defineProperties = impl_defineProperties;
}