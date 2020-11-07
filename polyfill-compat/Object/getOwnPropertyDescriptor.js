import { compat_getOwnPropertyDescriptor } from "../../impl-compat/Object/object-property";
if(!Object.getOwnPropertyDescriptor){
	Object.getOwnPropertyDescriptor=compat_getOwnPropertyDescriptor;
}