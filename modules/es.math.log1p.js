
if(!Math.log1p){
	Math.log1p=function(x) {
		return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};
}