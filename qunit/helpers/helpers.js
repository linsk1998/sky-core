export function is(a, b) {
	// eslint-disable-next-line no-self-compare
	return a === b ? a !== 0 || 1 / a === 1 / b : a != a && b != b;
}