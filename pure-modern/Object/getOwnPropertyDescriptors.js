import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { getOwnPropertyDescriptors$ie } from "../../impl/object/accessor/getOwnPropertyDescriptors$ie";
import { getOwnPropertyDescriptors$sb } from "../../impl/object/accessor/getOwnPropertyDescriptors$sb";

export default Object.getOwnPropertyDescriptors || (
	getOwnPropertySymbols ? getOwnPropertyDescriptors$sb : getOwnPropertyDescriptors$ie
);
