import { Math } from "../../native/Math";
import { acosh } from "../../impl/Math/acosh";
if(!Math.acosh) {
	Math.acosh = acosh;
}