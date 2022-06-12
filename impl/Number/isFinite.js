import { isFinite as native_isFinite } from "../../native/isFinite";
export function isFinite(value) {
	return typeof value === 'number' && native_isFinite(value);
}