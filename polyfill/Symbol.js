import { Symbol as native_Symbol } from "../native/Symbol";
import { Symbol as compat_Symbol } from "../impl-compat/Symbol";
import { Symbol as modern_Symbol } from "../impl-modern/Symbol";
if(!native_Symbol) {
	this.Symbol = compat_Symbol;
} else{
	if(String(Symbol()) !== String(Symbol(""))) {
		Object.setPrototypeOf(modern_Symbol,Symbol);
		this.Symbol = modern_Symbol;
	}
	if(!Symbol.asyncIterator){ Symbol.asyncIterator = native_Symbol("asyncIterator")}
	if(!Symbol.hasInstance){ Symbol.hasInstance = native_Symbol("hasInstance")}
	if(!Symbol.isConcatSpreadable ){ Symbol.isConcatSpreadable = native_Symbol("isConcatSpreadable")}
	if(!Symbol.iterator ){ Symbol.iterator = native_Symbol("iterator")}
	if(!Symbol.match ){ Symbol.match = native_Symbol("match")}
	if(!Symbol.matchAll ){ Symbol.matchAll = native_Symbol("matchAll")}
	if(!Symbol.replace ){ Symbol.replace = native_Symbol("replace")}
	if(!Symbol.search ){ Symbol.search = native_Symbol("search")}
	if(!Symbol.species ){ Symbol.species = native_Symbol("species")}
	if(!Symbol.split ){ Symbol.split = native_Symbol("split")}
	if(!Symbol.toPrimitive ){Symbol.toPrimitive = native_Symbol("toPrimitive")}
	if(!Symbol.toStringTag){ Symbol.toStringTag = native_Symbol("toStringTag")}
	if(!Symbol.unscopables ){ Symbol.unscopables = native_Symbol("unscopables")}
}