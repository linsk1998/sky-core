import { hasOwnProperty } from "../native/Object/prototype/hasOwnProperty";
import { hasEnumBug } from "../utils/hasEnumBug";
import { getPrototypeOf } from "../impl-compat/Object/getPrototypeOf";
import { dontEnums } from "./dontEnums";
import { isJsObject } from "./isJsObject";

export function forOwn(obj, fn, thisArg) {
	var key;
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
				if(proto[key] === obj[key]) {
					continue;
				}
				if(fn.call(thisArg, obj[key], key) === false) {
					return false;
				}
			}
			return true;
		}
	}
	for(key in obj) {
		switch(key.substring(0, 2)) {
			case "__":
			case "@@":
				continue;
		}
		if(hasOwnProperty.call(obj, key)) {
			if(fn.call(thisArg, obj[key], key) === false) {
				return false;
			}
		}
	}
	if(hasEnumBug) {
		var i = dontEnums.length;
		while(i-- > 0) {
			key = dontEnums[i];
			if(hasOwnProperty.call(obj, key)) {
				if(fn.call(thisArg, obj[key], key) === false) {
					return false;
				}
			}
		}
	}
	return true;
};