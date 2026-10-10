import { Object } from "../../native/Object";
import { getOwnPropertyDescriptors$es3 } from "../../impl/object/accessor/getOwnPropertyDescriptors$es3";

if(!Object.getOwnPropertyDescriptors) {
	Object.getOwnPropertyDescriptors = getOwnPropertyDescriptors$es3;
}
