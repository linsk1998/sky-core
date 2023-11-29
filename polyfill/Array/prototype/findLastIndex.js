import { findLastIndex } from "../../../impl/Array/prototype/findLastIndex";
if(!Array.prototype.findLastIndex) {
	Array.prototype.findLastIndex = findLastIndex;
}