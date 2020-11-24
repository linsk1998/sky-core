import {Symbol as nativeSymbol} from "../../native/Symbol";
import {keys as compat_keys} from "../../impl-compat/Object/keys";
import {nie_keys,ie_keys} from "../../impl-modern/Object/keys";
import {hasEnumBug} from "../../utils/hasEnumBug";

if(!Object.keys){
	if(hasEnumBug){
		Object.keys=compat_keys;
	}else{
		Object.keys=ie_keys;
	}
}else if(!nativeSymbol){
	Object.keys=nie_keys;
}