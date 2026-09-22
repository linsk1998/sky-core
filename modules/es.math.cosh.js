import "core-js/modules/es.math.expm1";
if(!Math.cosh){
	Math.cosh=function(x) {
		var t = Math.expm1(Math.abs(x) - 1) + 1;
		return (t + 1 / (t * Math.E * Math.E)) * (Math.E / 2);
	}
}
