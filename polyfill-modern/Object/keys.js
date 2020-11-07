import "../../polyfill/globalThis";
import "../../polyfill/String/prototype/startsWith";
import {ie_keys,nie_keys} from "../../impl-modern/Object/object-enum";
if(!Object.keys){
	Object.keys=ie_keys;
}else if(globalThis.Symbol && Symbol.sham){
	Object.keys=nie_keys;
}