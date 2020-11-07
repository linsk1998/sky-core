
export function getOwnPropertyDescriptor(obj,prop){
	var key='@@desc:'+prop;
	if(Object.prototype.hasOwnProperty.call(obj,key)){
		return obj[key];
	}
	if(Object.prototype.hasOwnProperty.call(obj,prop)){
		return {value: obj[prop], writable: true, enumerable: true, configurable: true};
	}
};