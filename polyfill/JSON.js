import {stringify,parse} from "../impl/JSON";
if(!globalThis.JSON){
	globalThis.JSON={
		stringify:stringify,
		parse:parse
	};
}