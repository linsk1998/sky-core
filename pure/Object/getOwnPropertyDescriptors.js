import { defineProperty } from "../../native/Object/defineProperty";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { getOwnPropertyDescriptors$ff } from "../../impl/object/accessor/getOwnPropertyDescriptors$ff";
import { getOwnPropertyDescriptors$ie } from "../../impl/object/accessor/getOwnPropertyDescriptors$ie";
import { getOwnPropertyDescriptors$sb } from "../../impl/object/accessor/getOwnPropertyDescriptors$sb";
import { getOwnPropertyDescriptors$es3 } from "../../impl/object/accessor/getOwnPropertyDescriptors$es3";

export default Object.getOwnPropertyDescriptors || (
	defineProperty ?
		(getOwnPropertySymbols ? getOwnPropertyDescriptors$sb : getOwnPropertyDescriptors$ie) :
		(__defineSetter__ ? getOwnPropertyDescriptors$ff : getOwnPropertyDescriptors$es3)
);
