if(!String.prototype.endsWith){
	String.prototype.endsWith=function endsWith(prefix,position){
		var length=prefix.length;
		position=position<length?position:this.length;
		return this.slice(position-length, position) === prefix;
	};
}