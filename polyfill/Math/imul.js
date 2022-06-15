import { Math } from "../../native/Math";
import { imul } from "../../impl/Math/imul";
if(!Math.imul) {
	Math.imul = imul;
}