import "core-js/modules/es.math.log1p";
if(!Math.acosh){
	Math.acosh = function () {
		return (x = +x) < 1 ? NaN : x > 94906265.62425156
			? Math.log(x) + Math.LN2
			: Math.log1p(x - 1 + Math.sqrt(x - 1) * Math.sqrt(x + 1));
	}
}