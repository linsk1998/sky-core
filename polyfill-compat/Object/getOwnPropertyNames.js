import "../../polyfill/String/prototype/startsWith";
import "../../polyfill/Array/prototype/includes";
import { compat_getOwnPropertyNames } from "../../impl-compat/Object/object-property";
if(!Object.getOwnPropertyNames){
	Object.getOwnPropertyNames=compat_getOwnPropertyNames;
}