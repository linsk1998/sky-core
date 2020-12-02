import { Symbol as native_Symbol } from "../native/Symbol";


function Symbol(desc) {
	if(desc == undefined) {
		desc = "";
	}
	return native_Symbol(desc);
}
Symbol.asyncIterator = native_Symbol.asyncIterator || native_Symbol("asyncIterator");
Symbol.hasInstance = native_Symbol.hasInstance || native_Symbol("hasInstance");
Symbol.isConcatSpreadable = native_Symbol.isConcatSpreadable || native_Symbol("isConcatSpreadable");
Symbol.iterator = native_Symbol.iterator || native_Symbol("iterator");
Symbol.match = native_Symbol.match || native_Symbol("match");
Symbol.matchAll = native_Symbol.matchAll || native_Symbol("matchAll");
Symbol.replace = native_Symbol.replace || native_Symbol("replace");
Symbol.search = native_Symbol.search || native_Symbol("search");
Symbol.species = native_Symbol.species || native_Symbol("species");
Symbol.split = native_Symbol.split || native_Symbol("split");
Symbol.toPrimitive = native_Symbol.toPrimitive || native_Symbol("toPrimitive");
Symbol.toStringTag = native_Symbol.toStringTag || native_Symbol("toStringTag");
Symbol.unscopables = native_Symbol.unscopables || native_Symbol("unscopables");

export { Symbol };