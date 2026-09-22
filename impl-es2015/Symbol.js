import { Symbol as native_Symbol } from "../native/Symbol";

var descs = Object.create(null);
export function Symbol() {
	var desc = arguments[0];
	if(desc !== undefined) {
		desc = String(desc);
	}
	var s = native_Symbol(desc);
	descs[s] = desc;
	return s;
};
Object.setPrototypeOf(Symbol, native_Symbol);

export function getSymbolDescription() {
	if(this in descs) {
		return descs[this];
	}
	return String(this).slice(7, -1);
}
