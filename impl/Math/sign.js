
// from core-js https://github.com/zloirock/core-js
export function sign(x) {
	return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
}