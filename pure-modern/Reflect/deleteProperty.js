
import { deleteProperty as modern_deleteProperty } from "../../impl-modern/Reflect/deleteProperty";
export var deleteProperty = Reflect.deleteProperty || modern_deleteProperty;