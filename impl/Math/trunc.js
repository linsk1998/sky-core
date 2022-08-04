
import { floor } from "../../native/Math/floor";
import { ceil } from "../../native/Math/ceil";

// from core-js https://github.com/zloirock/core-js
export function trunc(it) {
	return (it > 0 ? floor : ceil)(it);
}