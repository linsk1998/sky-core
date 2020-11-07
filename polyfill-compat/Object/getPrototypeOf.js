import {compat_getPrototypeOf} from "../../impl-compat/Object/object-inherits";
if(!Object.getPrototypeOf){
	Object.getPrototypeOf=compat_getPrototypeOf;
}