if(!String.prototype.startsWith){
	String.prototype.startsWith=function startsWith(prefix,position){
		if(prefix===null){ return false;}
		position=position?position:0;
		return this.slice(position, prefix.length) === prefix;
	};
}