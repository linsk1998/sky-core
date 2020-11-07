if(!String.prototype.trimEnd){
	String.prototype.trimEnd=function trimEnd(){
		return this.replace(/[\s\uFEFF\xA0]+$/g,'');
	};
}