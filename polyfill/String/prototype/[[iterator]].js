import {Symbol} from "../../../impl/Symbol";
function StringIterator(str){
	this.string=str;
	this.i=0;
}
StringIterator.prototype.next=function(){
	var result={},i=this.i;
	result.done=this.string.length<=i;
	if(!result.done){
		result.value=this.string.charAt(i);
		this.i=++i;
	}
	return result;
};
if(!String.prototype[Symbol.iterator]){
	String.prototype[Symbol.iterator]=function(){
		return new StringIterator(this);
	};
}
