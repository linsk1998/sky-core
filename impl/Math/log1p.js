
// from core-js https://github.com/zloirock/core-js
export function log1p(x) {
	return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};