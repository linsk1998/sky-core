import { isJsObject } from "sky-core/utils-compat/isJsObject";
import { dontEnums } from "sky-core/utils-compat/dontEnums";
import { hasEnumBug } from "sky-core/utils/hasEnumBug";
import { getPrototypeOf } from "../../Reflect/getPrototypeOf";
import { isString } from "sky-core/utils/isString";
import { isArray } from "../../Array/isArray";

export function getOwnPropertyNames$jscript(obj) {
	if(obj == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	var result = [], key;
	if(isString(obj) || isArray(obj)) {
		for(key = 0; key < obj.length; key++) {
			result.push(String(key));
		}
		result.push("length");
		return result;
	}
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
		if(key === "__proto__") {
			continue;
		}
		if(key.substring(0, 2) === "@@") {
			continue;
		}
		if(Object.hasOwn(obj, key)) {
			result.push(key);
		}
	}
	if(hasEnumBug) {
		var i = dontEnums.length;
		while(i-- > 0) {
			key = dontEnums[i];
			if(Object.hasOwn(obj, key)) {
				result.push(key);
			}
		}
	}
	return result;
}
