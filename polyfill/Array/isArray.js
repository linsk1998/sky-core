import { Array } from "../../native/Array";
import { isArray } from "../../impl/Array/isArray";

if(!Array.isArray) {
	Array.isArray = isArray;
}