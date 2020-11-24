import {Symbol as nativeSymbol} from "../../native/Symbol";
import {keys as compat_keys} from "../../impl-compat/Object/keys";
import {keys as nativeKeys} from "../../native/Object/keys";
import {nie_keys,ie_keys} from "../../impl-modern/Object/keys";
import {hasEnumBug} from "../../utils/hasEnumBug";

export var keys=nativeSymbol?nativeKeys:(
	Object.keys?nie_keys:(
		hasEnumBug?compat_keys:ie_keys
	)
);