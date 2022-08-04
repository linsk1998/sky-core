import { Math } from "../../native/Math";
import { sign } from "../../impl/Math/sign";
if(!Math.sign) {
	Math.sign = sign;
}