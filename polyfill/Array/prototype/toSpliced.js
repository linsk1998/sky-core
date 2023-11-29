import { toSpliced } from "../../../impl/Array/prototype/toSpliced";
if(!Array.prototype.toSpliced) {
	Array.prototype.toSpliced = toSpliced;
}