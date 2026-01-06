import { Reflect } from "../../native/Reflect";
import { preventExtensions as native_preventExtensions } from "../../native/Object/preventExtensions";
import { preventExtensions, preventExtensions$object } from "../../impl/Reflect/preventExtensions";

export default Reflect ?
	Reflect.preventExtensions :
	native_preventExtensions ?
		preventExtensions$object :
		preventExtensions;