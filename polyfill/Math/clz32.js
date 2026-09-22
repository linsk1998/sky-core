import { Math } from "../../native/Math";
import { clz32 } from "../../impl/Math/clz32";
if(!Math.clz32) {
	Math.clz32 = clz32;
}