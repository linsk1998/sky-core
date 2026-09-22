import { Math } from "../../native/Math";
import { sinh } from "../../impl/Math/sinh";
if(!Math.sinh || Math.sinh(-2e-17) === 0) {
	Math.sinh = sinh;
}