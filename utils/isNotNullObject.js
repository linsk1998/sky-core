export function isNotNullObject(obj) {
	return typeof obj === "object" ? obj !== null : typeof obj === "function";
};