import {getOwnPropertyDescriptor as compat_getOwnPropertyDescriptor} from "../../impl-compat/Object/getOwnPropertyDescriptor";
if(!Object.getOwnPropertyDescriptor){
	Object.getOwnPropertyDescriptor=compat_getOwnPropertyDescriptor;
}