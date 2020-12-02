
import { Symbol as compat_Symbol } from "../impl-compat/Symbol";
if(!globalThis.Symbol) {
	globalThis.Symbol = compat_Symbol;
}