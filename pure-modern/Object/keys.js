import { Symbol } from "../../native/Symbol";
import { keys as native_keys } from "../../native/Object/keys";
import { nie_keys, ie_keys } from "../../impl-modern/Object/keys";
export default !native_keys ? nie_keys : (Symbol ? native_keys : ie_keys);