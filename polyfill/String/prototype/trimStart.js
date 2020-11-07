if(!String.prototype.trimStart){
	String.prototype.trimStart=function trimStart(){
		return this.replace(/^[\s\uFEFF\xA0]+/g,'');
	};
}