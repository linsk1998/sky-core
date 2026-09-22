import { Reflect } from "../Reflect";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { ownKeys$symbol, ownKeys$property, ownKeys } from "../../impl/Reflect/ownKeys";

if(!Reflect.ownKeys) {
	if(getOwnPropertySymbols) {
		Reflect.ownKeys = ownKeys$symbol;
	} else if(getOwnPropertyNames) {
		Reflect.ownKeys = ownKeys$property;
	} else {
		Reflect.ownKeys = ownKeys;
	}
}
