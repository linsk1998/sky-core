import { Math } from "../../native/Math";
import { tanh } from "../../impl/Math/tanh";
if(!Math.tanh) {
	Math.tanh = tanh;
}