import { Math } from "../../native/Math";
import { fround } from "../../impl/Math/fround";
if(!Math.fround) {
	Math.fround = fround;
}