import { getOwnPropertyDescriptor } from "../../native/Object/getOwnPropertyDescriptor";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { getOwnPropertyDescriptor$ff } from "../../impl/object/accessor/getOwnPropertyDescriptor$ff";
import { getOwnPropertyDescriptor$es3 } from "../../impl/object/accessor/getOwnPropertyDescriptor$es3";

export default getOwnPropertyDescriptor || (
	__defineSetter__ ?
		getOwnPropertyDescriptor$ff :
		getOwnPropertyDescriptor$es3
);
