
import { Symbol as compat_Symbol } from "../impl-compat/Symbol";
import { Symbol as modern_Symbol } from "../impl-modern/Symbol";
import { Symbol as native_Symbol } from "../native/Symbol";

export default (function() {
	if(!native_Symbol) {
		return compat_Symbol;
	} else if(String(Symbol()) !== String(Symbol(""))) {
		Object.setPrototypeOf(modern_Symbol,native_Symbol);
		if(!native_Symbol.asyncIterator){ modern_Symbol.asyncIterator = native_Symbol("asyncIterator")}
		if(!native_Symbol.hasInstance){ modern_Symbol.hasInstance = native_Symbol("hasInstance")}
		if(!native_Symbol.isConcatSpreadable ){ modern_Symbol.isConcatSpreadable = native_Symbol("isConcatSpreadable")}
		if(!native_Symbol.iterator ){ modern_Symbol.iterator = native_Symbol("iterator")}
		if(!native_Symbol.match ){ modern_Symbol.match = native_Symbol("match")}
		if(!native_Symbol.matchAll ){ modern_Symbol.matchAll = native_Symbol("matchAll")}
		if(!native_Symbol.replace ){ modern_Symbol.replace = native_Symbol("replace")}
		if(!native_Symbol.search ){ modern_Symbol.search = native_Symbol("search")}
		if(!native_Symbol.species ){ modern_Symbol.species = native_Symbol("species")}
		if(!native_Symbol.split ){ modern_Symbol.split = native_Symbol("split")}
		if(!native_Symbol.toPrimitive ){modern_Symbol.toPrimitive = native_Symbol("toPrimitive")}
		if(!native_Symbol.toStringTag){ modern_Symbol.toStringTag = native_Symbol("toStringTag")}
		if(!native_Symbol.unscopables ){ modern_Symbol.unscopables = native_Symbol("unscopables")}
	} else {
		return native_Symbol;
	}
})();