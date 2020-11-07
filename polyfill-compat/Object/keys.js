
import "../../polyfill/globalThis";
import "../../polyfill/String/prototype/startsWith";
import {compat_keys} from "../../impl-compat/Object/object-enum";
if(!Object.keys){
	Object.keys=compat_keys;
}