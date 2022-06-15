import { Math } from "../../native/Math";
import { atanh } from "../../impl/Math/atanh";
if(!Math.atanh) {
	Math.atanh = atanh;
}