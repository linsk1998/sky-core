import "../globalThis";
import "../String/prototype/startsWith";
import {compat_keys} from "../impl-compat/Object/object-enum";
import {ie_keys,nie_keys} from "../impl-modern/Object/object-enum";
import {hasEnumBug} from "../utils/hasEnumBug";
if(!Object.keys){
	if(hasEnumBug){
		Object.keys=compat_keys;
	}else{
		Object.keys=ie_keys;
	}
}else if(globalThis.Symbol && Symbol.sham){
	Object.keys=nie_keys;
}