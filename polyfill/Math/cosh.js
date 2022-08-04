import { Math } from "../../native/Math";
import { cosh } from "../../impl/Math/cosh";
if(!Math.cosh) {
	Math.cosh = cosh;
}