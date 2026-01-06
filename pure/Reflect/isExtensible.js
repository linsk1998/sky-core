import { Reflect } from "../../native/Reflect";
import { isExtensible as Object_isExtensible } from "../../native/Object/isExtensible";
import { isExtensible, isExtensible$object } from "../../impl/Reflect/isExtensible";

export default Reflect ?
	Reflect.isExtensible :
	Object_isExtensible ?
		isExtensible$object :
		isExtensible;