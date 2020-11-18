import "../../polyfill/globalThis";
import "../../polyfill/String/prototype/startsWith";
import {nativeSymbol} from "../../native/Symbol";
import {ie_keys,nie_keys} from "../../impl-modern/Object/object-enum";
if(!Object.keys){
	Object.keys=ie_keys;
}else if(!nativeSymbol){
	Object.keys=nie_keys;
}