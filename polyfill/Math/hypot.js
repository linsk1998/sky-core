import { Math } from "../../native/Math";
import { hypot } from "../../impl/Math/hypot";
if(!Math.hypot) {
	Math.hypot = hypot;
}