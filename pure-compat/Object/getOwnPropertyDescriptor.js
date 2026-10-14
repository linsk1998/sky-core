import { getOwnPropertyDescriptor } from "../../native/Object/getOwnPropertyDescriptor";
import { getOwnPropertyDescriptor$ie8 } from "../../impl/object/accessor/getOwnPropertyDescriptor$ie8";
import { getOwnPropertyDescriptor$es3 } from "../../impl/object/accessor/getOwnPropertyDescriptor$es3";

export default getOwnPropertyDescriptor
	? getOwnPropertyDescriptor$ie8
	: getOwnPropertyDescriptor$es3;
