import { Math } from "../../native/Math";
import { log1p } from "../../impl/Math/log1p";
if(!Math.log1p) {
	Math.log1p = log1p;
}