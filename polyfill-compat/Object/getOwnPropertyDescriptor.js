import { Object } from "../../native/Object";
import { getOwnPropertyDescriptor, ie8_getOwnPropertyDescriptor } from "../../impl-compat/Object/getOwnPropertyDescriptor";
if(Object.getOwnPropertyDescriptor) {
	Object.getOwnPropertyDescriptor = ie8_getOwnPropertyDescriptor;
} else {
	Object.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
}