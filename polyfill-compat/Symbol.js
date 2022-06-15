import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as compat_Symbol } from "../impl-compat/Symbol";
var Symbol = native_Symbol;
if(!Symbol) {
	this.Symbol = Symbol = compat_Symbol;
	Symbol.sham = true;
	Symbol.asyncIterator = "@@asyncIterator";
	Symbol.hasInstance = "@@hasInstance";
	// Symbol.isConcatSpreadable = "@@isConcatSpreadable";
	Symbol.iterator = "@@iterator";
	// Symbol.match = "@@match";
	// Symbol.matchAll = "@@matchAll";
	// Symbol.replace = "@@replace";
	// Symbol.search = "@@search";
	// Symbol.species = "@@species";
	// Symbol.split = "@@split";
	// Symbol.toPrimitive = "@@toPrimitive";
	// Symbol.toStringTag = "@@toStringTag";
	// Symbol.unscopables = "@@unscopables";
}
export { Symbol };