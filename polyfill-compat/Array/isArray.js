import { Array } from "../../native/Array";
import { isArray } from "../../impl-compat/Array/isArray";

if(!Array.isArray) {
	Array.isArray = isArray;
}