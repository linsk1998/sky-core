
import { get as modern_get } from "../../impl-modern/Reflect/get";
export var get = Reflect.get || modern_get;