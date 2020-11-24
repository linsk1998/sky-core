
import {getOwnPropertyNames as modern_getOwnPropertyNames} from "../../impl-modern/Object/getOwnPropertyNames";

export var getOwnPropertyNames=Object.getOwnPropertyNames || modern_getOwnPropertyNames;