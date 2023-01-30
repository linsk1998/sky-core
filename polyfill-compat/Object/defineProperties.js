import { Object } from "../../native/Object";
import { defineProperties as native_defineProperties } from "../../native/Object/defineProperties";
import { defineProperties } from "../../impl/Object/defineProperties";

if(!native_defineProperties) {
	Object.defineProperties = defineProperties;
}