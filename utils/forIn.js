
import {compat_forIn} from "../impl-compat/Object/object-enum";
import {symbol_forIn,nosymbol_forIn} from "../impl-modern/Object/object-enum";
import {hasEnumBug} from "../utils/hasEnumBug";
var forIn;
if(!globalThis.Symbol || !Symbol.sham){
	if(hasEnumBug){
		Object.keys=compat_keys;
		forIn=compat_forIn;
	}else{
		forIn=nosymbol_forIn;
	}
}else{
	forIn=symbol_forIn;
}
export {forIn};