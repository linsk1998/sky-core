import { getOwnPropertyNames as getOwnPropertyNames$jscript } from "../../impl/object/enum/getOwnPropertyNames$jscript";
import { getOwnPropertyNames as getOwnPropertyNames$ff } from "../../impl/object/enum/getOwnPropertyNames$ff";

export default Object.getOwnPropertyNames || (
	Object.prototype.__defineSetter__ ?
		getOwnPropertyNames$ff :
		getOwnPropertyNames$jscript

);
