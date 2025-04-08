import { Math } from "../../native/Math";
import { acosh } from "../../impl/Math/acosh";
if(!Math.acosh || Math.acosh(Number.MAX_VALUE) === Infinity) {
	Math.acosh = acosh;
}