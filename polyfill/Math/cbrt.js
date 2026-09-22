import { Math } from "../../native/Math";
import { cbrt } from "../../impl/Math/cbrt";
if(!Math.cbrt) {
	Math.cbrt = cbrt;
}