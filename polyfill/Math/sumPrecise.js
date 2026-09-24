import { Math } from "../../native/Math";
import { sumPrecise } from "../../impl/Math/sumPrecise";
if(!Math.sumPrecise) {
	Math.sumPrecise = sumPrecise;
}
