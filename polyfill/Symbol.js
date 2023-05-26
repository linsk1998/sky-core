import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as compat_Symbol } from "../impl/Symbol";
import { Symbol as modern_Symbol } from "../impl-modern/Symbol";
var Symbol = native_Symbol;
if(!native_Symbol) {
	Symbol = this.Symbol = compat_Symbol;
	Symbol.sham = true;
	Symbol.iterator = "@@iterator";
	Symbol.hasInstance = "@@hasInstance";
	Symbol.asyncIterator = "@@asyncIterator";
	// 其他目前不支持
	// Symbol.species = "@@species";
	// Symbol.isConcatSpreadable = "@@isConcatSpreadable";
	// Symbol.match = "@@match";
	// Symbol.matchAll = "@@matchAll";
	// Symbol.replace = "@@replace";
	// Symbol.search = "@@search";
	// Symbol.split = "@@split";
	// Symbol.toPrimitive = "@@toPrimitive";
	// Symbol.toStringTag = "@@toStringTag";
	// compat_Symbol.unscopables = "@@unscopables";
} else {
	if(String(Symbol()) !== String(Symbol(""))) {
		Object.setPrototypeOf(modern_Symbol, Symbol);
		Symbol = this.Symbol = modern_Symbol;
	}
	if(!Symbol.iterator) { Symbol.iterator = Symbol("iterator"); }
	if(!Symbol.hasInstance) { Symbol.hasInstance = Symbol("hasInstance"); }
	if(!Symbol.asyncIterator) { Symbol.asyncIterator = Symbol("asyncIterator"); }
	// if(!Symbol.species) { Symbol.species = Symbol("species"); }
	// if(!Symbol.isConcatSpreadable) { Symbol.isConcatSpreadable = Symbol("isConcatSpreadable"); }
	// if(!Symbol.match) { Symbol.match = Symbol("match"); }
	// if(!Symbol.matchAll) { Symbol.matchAll = Symbol("matchAll"); }
	// if(!Symbol.replace) { Symbol.replace = Symbol("replace"); }
	// if(!Symbol.search) { Symbol.search = Symbol("search"); }
	// if(!Symbol.split) { Symbol.split = Symbol("split"); }
	// if(!Symbol.toPrimitive) { Symbol.toPrimitive = Symbol("toPrimitive"); }
	// if(!Symbol.toStringTag) { Symbol.toStringTag = Symbol("toStringTag"); }
	// if(!Symbol.unscopables) { Symbol.unscopables = Symbol("unscopables"); }
}
export { Symbol };