import { Math } from "../../native/Math";
import { trunc } from "../../impl/Math/trunc";
if(!Math.trunc) {
	Math.trunc = trunc;
}