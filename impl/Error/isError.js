import { Error } from "../../native/Error";

export function isError(value) {
	if(value == null) return false;
	if(typeof value !== "object" && typeof value !== "function") return false;
	return value instanceof Error;
}
