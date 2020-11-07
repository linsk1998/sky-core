import "../Object/keys";
if(!Object.assign){
	Object.assign=function(target, varArgs){
		if(target===null){
			throw 'Cannot convert undefined or null to object';
		}
		var to=target;
		for(var i=1;i<arguments.length;i++){
			var obj=arguments[i];
			if(obj!=null){
				var keys=Object.keys(obj);
				for(var j=0;j<keys.length;j++){
					var key=keys[j];
					to[key]=obj[key];
				}
			}
		}
		return target;
	};
}