import { Object } from "../../native/Object";
import { defineProperties as suport_defineProperties } from "../../native/Object/defineProperties";
import { defineProperties } from "../../impl/Object/defineProperties";

if(!suport_defineProperties) {
	Object.defineProperties = defineProperties;
}