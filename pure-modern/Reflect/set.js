
import { set as modern_set } from "../../impl-modern/Reflect/set";
export var set = Reflect.set || modern_set;