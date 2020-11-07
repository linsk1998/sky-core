export function get(target,propertyKey,receiver){
	if(receiver===void 0){ receiver=target}
	var desc=target["@@desc:"+propertyKey];
	if(desc){
		if(desc.get){
			return desc.get.call(receiver);
		}
		return desc.value;
	}
	return target[propertyKey];
};