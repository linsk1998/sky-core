import { URL } from "../native/URL";
import { definePrototype } from "../utils/definePrototype";

definePrototype(URL, 'toJSON', function toJSON() {
	return this.href;
});