import { dontEnums } from "./dontEnums";
import { getPrototypeOf } from "../impl-compat/Object/getPrototypeOf";
import { isJsObject } from "./isJsObject";
import { hasEnumBug } from "../utils/hasEnumBug";
export function forIn(obj, fn, thisArg) {
	if(typeof obj !== "object") {
		return false;
	}
	var jsObject = isJsObject(obj);
	for(var key in obj) {
		if(!jsObject) {
			if(key === "constructor") {
				continue;
			}
		}
		switch(key.substring(0, 2)) {
			case "__":
			case "@@":
				continue;
		}
		if(fn.call(thisArg, obj[key], key) === false) {
			return false;
		}
	}
	if(hasEnumBug) {
		var i = dontEnums.length;
		var proto = getPrototypeOf(obj);
		//遍历nonEnumerableProps数组
		while(i--) {
			var prop = dontEnums[i];
			if(prop in obj && obj[prop] !== proto[prop]) {
				if(fn.call(thisArg, obj[prop], prop) === false) {
					return false;
				}
			}
		}
	}
	return true;
};