
var symbol_sqe=0;
var all_symbol={};
function SymbolClass(desc){
	this.__name__="@@"+desc+":"+symbol_sqe;
	symbol_sqe++;
	all_symbol[this.__name__]=this;
}
SymbolClass.prototype.toString=function(){
	return this.__name__;
};
export function getOwnPropertySymbols(obj){
	var arr=[];
	for(var key in obj){
		if(key.startsWith("@@")){
			if(Object.prototype.hasOwnProperty.call(obj,key)){
				arr.push(all_symbol[key]);
			}
		}
	}
	return arr;
};
export function Symbol(desc){
	return new SymbolClass(desc);
};
Symbol.sham=true;
Symbol.iterator="@@iterator";
Symbol.hasInstance="@@hasInstance";