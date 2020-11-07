import "core-js/modules/es.math.sign";
if(!Math.cbrt){
	Math.cbrt=function(x) {
		return Math.sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	}
}