import { isJsObject } from "../../utils-compat/isJsObject";
import { dontEnums } from "../../utils-compat/dontEnums";
import { hasEnumBug } from "../../utils/hasEnumBug";
import { getPrototypeOf } from "./getPrototypeOf";

export function keys(obj) {
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	var result = [], key;
	var jsObject = isJsObject(obj);
	if(!jsObject) {
		var proto = getPrototypeOf(obj);
		if(proto) {
			for(key in obj) {
				switch(key.substring(0, 2)) {
					case "__":
					case "@@":
						continue;
				}
				if(proto[key] !== obj[key]) {
					result.push(key);
				}
			}
			return result;
		}
	}
	for(key in obj) {
		switch(key.substring(0, 2)) {
			case "__":
			case "@@":
				continue;
		}
		if(Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = obj["@@desc:" + key];
			if(!desc || desc.enumerable) {
				result.push(key);
			}
		}
	}
	if(hasEnumBug) {
		var i = dontEnums.length;
		while(i-- > 0) {
			key = dontEnums[i];
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				result.push(key);
			}
		}
	}
	return result;
}