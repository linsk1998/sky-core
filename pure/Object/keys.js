import { Symbol } from "../../native/Symbol";
import { keys } from "../../native/Object/keys";
import { keys$jscript } from "../../impl/object/enum/keys$jscript";
import { keys$es3 } from "../../impl/object/enum/keys$es3";
import { keys$fixSymbol } from "../../impl/object/enum/keys$fixSymbol";
import { hasEnumBug } from "../../utils/hasEnumBug";

export default Symbol ?
	keys : (
		keys ?
			keys$fixSymbol :
			hasEnumBug ?
				keys$jscript :
				keys$es3
	);
