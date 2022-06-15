import { Math } from "../../native/Math";
import { sinh } from "../../impl/Math/sinh";
if(!Math.sinh) {
	Math.sinh = sinh;
}