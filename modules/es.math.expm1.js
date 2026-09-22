
var nativeExpm1=Math.expm1;
if(!nativeExpm1 || nativeExpm1(10) > 22025.465794806719 || nativeExpm1(10) < 22025.4657948067165168 || nativeExpm1(-2e-17) != -2e-17){
	Math.expm1=function(x){
		return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	};
}