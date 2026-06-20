import { Symbol } from "../../native/Symbol";
import { keys as keys$jscript } from "../../impl/object/enum/keys$jscript";
import { keys as native_keys } from "../../native/Object/keys";
import { keys$es3 } from "../../impl/object/enum/keys$es3";
import { keys$fixSymbol } from "../../impl/object/enum/keys$fixSymbol";
import { hasEnumBug } from "../../utils/hasEnumBug";

export default Symbol ? native_keys : (
	Object.keys ? keys$fixSymbol : (
		hasEnumBug ? keys$jscript : keys$es3
	)
);
