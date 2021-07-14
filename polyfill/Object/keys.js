import { Symbol } from "../../native/Symbol";
import native_Object from "../../native/Object";
import { keys as compat_keys } from "../../impl-compat/Object/keys";
import { nie_keys, ie_keys } from "../../impl-modern/Object/keys";
import { hasEnumBug } from "../../utils/hasEnumBug";

if(!native_Object.keys) {
	if(hasEnumBug) {
		native_Object.keys = compat_keys;
	} else {
		native_Object.keys = nie_keys;
	}
} else if(!Symbol) {
	native_Object.keys = ie_keys;
}