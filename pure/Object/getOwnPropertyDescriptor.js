import { getOwnPropertyDescriptor } from "../../native/Object/getOwnPropertyDescriptor";
import { defineProperties } from "../../native/Object/defineProperties";
import { __defineSetter__ } from "../../support/__defineSetter__";
import { getOwnPropertyDescriptor$ff } from "../../impl/object/accessor/getOwnPropertyDescriptor$ff";
import { getOwnPropertyDescriptor$ie8 } from "../../impl/object/accessor/getOwnPropertyDescriptor$ie8";
import { getOwnPropertyDescriptor$es3 } from "../../impl/object/accessor/getOwnPropertyDescriptor$es3";

export default getOwnPropertyDescriptor
	? (!defineProperties
		? getOwnPropertyDescriptor$ie8
		: getOwnPropertyDescriptor)
	: (__defineSetter__
		? getOwnPropertyDescriptor$ff
		: getOwnPropertyDescriptor$es3);
