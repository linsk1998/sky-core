import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol } from "../impl-compat/Symbol";
if(!native_Symbol) {
	this.Symbol = Symbol;
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