import "./es.global-this";
if(!globalThis.Symbol){
	globalThis.Symbol=(function(){
		var sqe=0;
		var all={};
		function Symbol(desc){
			this.__name__="@@"+desc+":"+sqe;
			sqe++;
			all[this.__name__]=this;
		}
		Symbol.prototype.toString=function(){
			return this.__name__;
		};
		Object.getOwnPropertySymbols=function(obj){
			var arr=[];
			for(var key in obj){
				if(key.startsWith("@@")){
					if(Object.prototype.hasOwnProperty.call(obj,key)){
						arr.push(all[key]);
					}
				}
			}
			return arr;
		};
		return function(desc){
			return new Symbol(desc);
		};
	})();
	Symbol.sham=true;
	Symbol.iterator="@@iterator";
}