export function isWindow(obj){
	return obj && typeof obj === "object" && "setInterval" in obj;
};