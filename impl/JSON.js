import "core-js/modules/es.object.keys";
import {escapeString} from "../utils/escapeString";
import {isFunction} from "../utils/isFunction";
export function stringify(obj){
	switch(obj){
		case undefined:
		case null:
			return "null";
		case false:
		case true:
			return obj;
		default:
			var type=Object.prototype.toString.call(obj);
			switch(type){
				case '[object String]':
					return '"'+escapeString(obj)+'"';
				case '[object Number]':
					return isNaN(obj)?"null":obj.toString();
				case '[object Array]':
					return "["+obj.map(stringify).join(",")+"]";
				default:
					if(obj.toJSON && isFunction(obj.toJSON)){
						return stringify(obj.toJSON());
					}
					var items=[];
					var keys=Object.keys(obj);
					for(var i=0;i<keys.length;i++){
						var key=keys[i];
						var value=obj[key];
						if(value!==void 0){
							if(!isFunction(value)){
								items.push('"'+escapeString(key)+'":'+stringify(value));
							}
						}
					}
					return "{"+items.join(",")+"}";
			}
	}
}
export function parse(str){
	return eval('('+str+')');
}