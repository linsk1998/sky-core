import {keys} from "sky-core/pure/Object/keys";
export function assign(target, varArgs){
	if(target===null){
		throw 'Cannot convert undefined or null to object';
	}
	var to=target;
	for(var i=1;i<arguments.length;i++){
		var obj=arguments[i];
		if(obj!=null){
			var ownKeys=keys(obj);
			for(var j=0;j<ownKeys.length;j++){
				var key=ownKeys[j];
				to[key]=obj[key];
			}
		}
	}
}