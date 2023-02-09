export function toInteger(n) {
	return isNaN(n = +n) ? 0 : (n > 0 ? Math.floor : Math.ceil)(n);
}