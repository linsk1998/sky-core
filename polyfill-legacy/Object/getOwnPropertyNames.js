import { Object } from "../../native/Object";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { getOwnPropertyNames$es3 } from "../../impl/object/enum/getOwnPropertyNames$es3";

if(!getOwnPropertyNames) {
	Object.getOwnPropertyNames = getOwnPropertyNames$es3;
}
