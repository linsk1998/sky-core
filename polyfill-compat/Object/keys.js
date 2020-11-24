
import {keys as compat_keys} from "../../impl-compat/Object/keys";
if(!Object.keys){
	Object.keys=compat_keys;
}