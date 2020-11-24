
import {Symbol as nativeSymbol} from "../../native/Symbol";
import {nie_keys,ie_keys} from "../../impl-modern/Object/keys";
if(!Object.keys){
	Object.keys=ie_keys;
}else if(!nativeSymbol){
	Object.keys=nie_keys;
}