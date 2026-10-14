import { Symbol } from "../../native/Symbol";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { getOwnPropertyNames$jscript } from "../../impl/object/enum/getOwnPropertyNames$jscript";
import { getOwnPropertyNames$es3 } from "../../impl/object/enum/getOwnPropertyNames$es3";
import { getOwnPropertyNames$fixSymbol } from "../../impl/object/enum/getOwnPropertyNames$fixSymbol";
import { hasEnumBug } from "../../utils/hasEnumBug";

export default Symbol ?
	getOwnPropertyNames : (
		getOwnPropertyNames ?
			getOwnPropertyNames$fixSymbol :
			hasEnumBug ?
				getOwnPropertyNames$jscript :
				getOwnPropertyNames$es3
	);
