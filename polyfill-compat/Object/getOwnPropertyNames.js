
import {getOwnPropertyNames as compat_getOwnPropertyNames } from "../../impl-compat/Object/getOwnPropertyNames";
if(!Object.getOwnPropertyNames){
	Object.getOwnPropertyNames=compat_getOwnPropertyNames;
}