import {Symbol as nativeSymbol} from "../../native/Symbol";
import {keys as nativeKeys} from "../../native/Object/keys";
import {nie_keys,ie_keys} from "../../impl-modern/Object/keys";

export var keys=!nativeKeys?ie_keys:(nativeSymbol?nativeKeys:nie_keys);