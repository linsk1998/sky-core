if(Object.defineProperty){
	if(!('name' in Function.prototype)){
		Object.defineProperty(Function.prototype,'name',{
			writable:false,enumerable:false,configurable:true,
			get:function(){
				var name=this.toString().match(/function\s*([^(]*)\(/)[1];
				return name || "anonymous";
			}
		});
	}
}