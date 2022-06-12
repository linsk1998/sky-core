import { Array } from "../../native/Array";
import { from } from "../../impl/Array/from";
if(!Array.from) {
	Array.from = from;
}