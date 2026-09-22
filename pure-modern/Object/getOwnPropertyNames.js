import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { Symbol } from "../../native/Symbol";
import { getOwnPropertyNames$es3 } from "../../impl/object/enum/getOwnPropertyNames$es3";
import { getOwnPropertyNames$fixSymbol } from "../../impl/object/enum/getOwnPropertyNames$fixSymbol";

export default Symbol ?
	getOwnPropertyNames :
	getOwnPropertyNames ?
		getOwnPropertyNames$fixSymbol :
		getOwnPropertyNames$es3;
