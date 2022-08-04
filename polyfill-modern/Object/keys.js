import { Object } from "../../native/Object";
import { Symbol } from "../../native/Symbol";
import { nie_keys, ie_keys } from "../../impl-modern/Object/keys";
if(!Object.keys) {
	Object.keys = nie_keys;
} else if(!Symbol) {
	Object.keys = ie_keys;
}