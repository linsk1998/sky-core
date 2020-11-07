if(!Math.asinh){
	Math.asinh=function(x){
		return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -Math.asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	};
}
