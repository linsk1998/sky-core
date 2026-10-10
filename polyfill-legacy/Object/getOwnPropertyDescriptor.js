import { Object } from "../../native/Object";
import { getOwnPropertyDescriptor } from "../../native/Object/getOwnPropertyDescriptor";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { getOwnPropertyDescriptor$ff } from "../../impl/object/accessor/getOwnPropertyDescriptor$ff";
import { getOwnPropertyDescriptor$es3 } from "../../impl/object/accessor/getOwnPropertyDescriptor$es3";

if(!getOwnPropertyDescriptor) {
	if(__defineSetter__) {
		Object.getOwnPropertyDescriptor = getOwnPropertyDescriptor$ff;
	} else {
		Object.getOwnPropertyDescriptor = getOwnPropertyDescriptor$es3;
	}
}
