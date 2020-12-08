import { getCurrentScript } from "../utils-compat/getCurrentScript";
import { defineProperty } from "../../pure-compat/Object/defineProperty";
if(!Object.defineProperties) {
	defineProperty(document, "currentScript", {
		get: getCurrentScript
	});
}