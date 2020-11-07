
if (!Math.tanh) {
	Math.tanh = function (x) {
		var a = Math.expm1(x = +x);
		var b = Math.expm1(-x);
		return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (Math.exp(x) + Math.exp(-x));
	};
}