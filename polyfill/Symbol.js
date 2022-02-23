import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as compat_Symbol } from "../impl/Symbol";
import { Symbol as modern_Symbol } from "../impl-modern/Symbol";
if(!native_Symbol) {
	this.Symbol = compat_Symbol;
	Symbol.sham = true;
	Symbol.iterator = "@@iterator";
	Symbol.hasInstance = "@@hasInstance";
	Symbol.asyncIterator = "@@asyncIterator";
	Symbol.species = "@@species";
	// 其他目前不支持
	// Symbol.isConcatSpreadable = "@@isConcatSpreadable";
	// Symbol.match = "@@match";
	// Symbol.matchAll = "@@matchAll";
	// Symbol.replace = "@@replace";
	// Symbol.search = "@@search";
	// Symbol.split = "@@split";
	// Symbol.toPrimitive = "@@toPrimitive";
	// Symbol.toStringTag = "@@toStringTag";
	// Symbol.unscopables = "@@unscopables";
} else {
	if(String(Symbol()) !== String(Symbol(""))) {
		Object.setPrototypeOf(modern_Symbol, Symbol);
		this.Symbol = modern_Symbol;
	}
	if(!Symbol.iterator) { Symbol.iterator = native_Symbol("iterator"); }
	if(!Symbol.hasInstance) { Symbol.hasInstance = native_Symbol("hasInstance"); }
	if(!Symbol.asyncIterator) { Symbol.asyncIterator = native_Symbol("asyncIterator"); }
	if(!Symbol.species) { Symbol.species = native_Symbol("species"); }
	// if(!Symbol.isConcatSpreadable) { Symbol.isConcatSpreadable = native_Symbol("isConcatSpreadable"); }
	// if(!Symbol.match) { Symbol.match = native_Symbol("match"); }
	// if(!Symbol.matchAll) { Symbol.matchAll = native_Symbol("matchAll"); }
	// if(!Symbol.replace) { Symbol.replace = native_Symbol("replace"); }
	// if(!Symbol.search) { Symbol.search = native_Symbol("search"); }
	// if(!Symbol.split) { Symbol.split = native_Symbol("split"); }
	// if(!Symbol.toPrimitive) { Symbol.toPrimitive = native_Symbol("toPrimitive"); }
	// if(!Symbol.toStringTag) { Symbol.toStringTag = native_Symbol("toStringTag"); }
	// if(!Symbol.unscopables) { Symbol.unscopables = native_Symbol("unscopables"); }
}