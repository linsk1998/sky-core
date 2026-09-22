import { isNaN as native_isNaN } from "../../native/isNaN";
export function isNaN(value) {
	return typeof value === "number" && native_isNaN(value);
}