import "../isArray";
if(!Array.prototype.flat){
	Array.prototype.flat=function(deep){
		var arr=[];
		for(var i=0;i<this.length;i++){
			var item=this[i];
			if(Array.isArray(item) && deep>0){
				arr=arr.concat(item.flat(deep-1));
			}else{
				arr.push(item);
			}
		}
		return arr;
	};
}