export function set(target,propertyKey,value,receiver){
	if(receiver===void 0){ receiver=target}
	var desc=target["@@desc:"+propertyKey];
	if(desc){
		if(desc.set){
			try{
				desc.set.call(receiver,value);
				return true;
			}catch(e){
				return false;
			}
		}
		desc.value=value;
		return true;
	}
	target[propertyKey]=value;
	return true;
};