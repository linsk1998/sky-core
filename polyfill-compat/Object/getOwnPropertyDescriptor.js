import { Object } from "../../native/Object";
import { getOwnPropertyDescriptor } from "../../native/Object/getOwnPropertyDescriptor";
import { getOwnPropertyDescriptor$ie8 } from "../../impl/object/accessor/getOwnPropertyDescriptor$ie8";
import { getOwnPropertyDescriptor$es3 } from "../../impl/object/accessor/getOwnPropertyDescriptor$es3";

if(getOwnPropertyDescriptor) {
	Object.getOwnPropertyDescriptor = getOwnPropertyDescriptor$ie8;
} else {
	Object.getOwnPropertyDescriptor = getOwnPropertyDescriptor$es3;
}
