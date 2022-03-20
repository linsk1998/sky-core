import { Array } from "../../native/Array";
import { of } from "../../impl/Array/of";
if(!Array.of) {
	Array.of = of;
}