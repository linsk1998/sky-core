if (!Math.sign) {
	Math.sign = function (x) {
		return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};
}