import { Math } from "../../native/Math";
import { cosh } from "../../impl/Math/cosh";
if(!Math.cosh || Math.cosh(710) === Infinity) {
	Math.cosh = cosh;
}