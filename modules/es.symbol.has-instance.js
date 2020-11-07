import "core-js/modules/es.symbol"
if(!Symbol.hasInstance){
	Symbol.hasInstance=Symbol("hasInstance");
}