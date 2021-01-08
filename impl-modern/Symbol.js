import { Symbol as native_Symbol } from "../native/Symbol";

export function Symbol(desc) {
	if(desc == undefined) {
		desc = "";
	}
	return native_Symbol(desc);
};