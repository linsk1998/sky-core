import { Symbol as native_Symbol } from "../native/Symbol";
import { isSymbol as native_isSymbol } from "../utils-es2015/isSymbol";
import { Symbol as impl_Symbol } from "../impl/Symbol/constructor";

export var isSymbol = native_Symbol ? native_isSymbol : function(obj) {
	return typeof obj === "object" && obj instanceof impl_Symbol;
};