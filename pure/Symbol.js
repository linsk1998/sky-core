
import { Symbol as compat_Symbol } from "../impl-compat/Symbol";
import { Symbol as modern_Symbol } from "../impl-modern/Symbol";
import { Symbol as native_Symbol } from "../native/Symbol";

export default (function() {
	var Symbol;
	if(!native_Symbol) {
		Symbol = compat_Symbol;
		Symbol.asyncIterator = "@@asyncIterator";
		Symbol.isConcatSpreadable = "@@isConcatSpreadable";
		Symbol.match = "@@match";
		Symbol.matchAll = "@@matchAll";
		Symbol.replace = "@@replace";
		Symbol.search = "@@search";
		Symbol.species = "@@species";
		Symbol.split = "@@split";
		Symbol.toPrimitive = "@@toPrimitive";
		Symbol.toStringTag = "@@toStringTag";
		Symbol.unscopables = "@@unscopables";
	} else {
		if(String(Symbol()) !== String(Symbol(""))) {
			Object.setPrototypeOf(modern_Symbol, native_Symbol);
			Symbol = modern_Symbol;
		} else {
			Symbol = native_Symbol;
		}
		if(!native_Symbol.asyncIterator) { Symbol.asyncIterator = Symbol("asyncIterator"); }
		if(!native_Symbol.isConcatSpreadable) { Symbol.isConcatSpreadable = Symbol("isConcatSpreadable"); }
		if(!native_Symbol.match) { Symbol.match = native_Symbol("match"); }
		if(!native_Symbol.matchAll) { Symbol.matchAll = native_Symbol("matchAll"); }
		if(!native_Symbol.replace) { Symbol.replace = native_Symbol("replace"); }
		if(!native_Symbol.search) { Symbol.search = native_Symbol("search"); }
		if(!native_Symbol.species) { Symbol.species = native_Symbol("species"); }
		if(!native_Symbol.split) { Symbol.split = native_Symbol("split"); }
		if(!native_Symbol.toPrimitive) { Symbol.toPrimitive = native_Symbol("toPrimitive"); }
		if(!native_Symbol.toStringTag) { Symbol.toStringTag = native_Symbol("toStringTag"); }
		if(!native_Symbol.unscopables) { Symbol.unscopables = native_Symbol("unscopables"); }
	}
	return Symbol;
})();