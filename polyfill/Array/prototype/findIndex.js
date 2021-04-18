import { findIndex } from "../../../impl/Array/prototype/findIndex";
if(!Array.prototype.findIndex) {
	Array.prototype.findIndex = findIndex;
}