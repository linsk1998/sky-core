import { Number } from "../../native/Number";
import { isFinite } from "../../impl/Number/isFinite";
if(!Number.isFinite) {
	Number.isFinite = isFinite;
}