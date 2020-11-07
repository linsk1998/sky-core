import "./es.symbol";
if(!Symbol.keyFor){
	Symbol.keyFor=function(symbol){
		return symbol.__desc__;
	};
}
if(! ('for' in Symbol)){
	var symbol_cache={};
	Symbol['for']=function(desc){
		if(Object.prototype.hasOwnProperty.call(symbol_cache,desc)){
			return symbol_cache[desc];
		}
		var s=Symbol(desc);
		s.__desc__=desc;
		symbol_cache[desc]=s;
		return s;
	};
}