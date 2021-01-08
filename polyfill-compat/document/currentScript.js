import { getCurrentScript } from "../utils-compat/getCurrentScript";
import { defineProperty } from "../../pure-compat/Object/defineProperty";

defineProperty(document, "currentScript", {
	get: getCurrentScript
});