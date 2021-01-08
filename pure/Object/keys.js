import { Symbol } from "../../native/Symbol";
import { keys as compat_keys } from "../../impl-compat/Object/keys";
import { keys as native_keys } from "../../native/Object/keys";
import { nie_keys, ie_keys } from "../../impl-modern/Object/keys";
import { hasEnumBug } from "../../utils/hasEnumBug";

export default Symbol ? native_keys : (
	Object.keys ? ie_keys : (
		hasEnumBug ? compat_keys : nie_keys
	)
);