import { Array } from "../../native/Array";
import { isArray as modern_isArray } from "../../impl/Array/isArray";

if(!Array.isArray) {
	Array.isArray = modern_isArray;
}