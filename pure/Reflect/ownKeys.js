import { Reflect } from "../../native/Reflect";
import { getOwnPropertySymbols } from "../../native/Object/getOwnPropertySymbols";
import { getOwnPropertyNames } from "../../native/Object/getOwnPropertyNames";
import { ownKeys$symbol } from "../../impl/Reflect/ownKeys$symbol";
import { ownKeys$property } from "../../impl/Reflect/ownKeys$property";
import { ownKeys } from "../../impl/Reflect/ownKeys";

export default Reflect ?
	Reflect.ownKeys :
	getOwnPropertySymbols ?
		ownKeys$symbol :
		getOwnPropertyNames ?
			ownKeys$property :
			ownKeys;
