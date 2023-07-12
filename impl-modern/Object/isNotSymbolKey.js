export function isNotSymbolKey(key) {
	return key.substring(0, 2) !== "@@";
}