
import { Symbol as SymbolConstructor } from "./Symbol/constructor";
export function Symbol(desc) {
	return new SymbolConstructor(desc);
};
Symbol.sham = true;