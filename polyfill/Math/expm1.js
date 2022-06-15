import { Math } from "../../native/Math";
import { expm1 } from "../../impl/Math/expm1";
if(!Math.expm1) {
	Math.expm1 = expm1;
}