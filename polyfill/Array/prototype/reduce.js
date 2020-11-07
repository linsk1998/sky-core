
if(!Array.prototype.reduce){
	Array.prototype.reduce=function(callback){
		var i,value;
		if(arguments.length>=2){
			value=arguments[1];
			i=0;
		}else if(this.length>0){
			value=this[0];
			i=1;
		}else{
			throw new Error("Reduce of empty array with no initial value");
		}
		while(i<this.length){
			if (i in this) {
				value=callback(value,this[i],i,this);
			}
			i++;
		}
		return value;
	};
}