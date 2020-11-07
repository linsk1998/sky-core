import "./flat";
import "./map";
if(!Array.prototype.flatMap){
	Array.prototype.flatMap=function(fn){
		return fn.map(fn).flat(1);
	};
}