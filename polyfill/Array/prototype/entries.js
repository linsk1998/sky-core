function Iterator(arr){
	this.array=arr;
	this.i=0;
}
Iterator.prototype.next=function(){
	var result={};
	result.done=this.array.length<=this.i;
	if(!result.done){
		result.value=this.array[this.i];
		this.i++;
	}
	return result;
};
if(!Array.prototype.entries){
	Array.prototype.entries=function(){
		return new Iterator(this);
	};
}