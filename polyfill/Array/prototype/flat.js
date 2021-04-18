import { flat } from "../../../impl/Array/prototype/flat";
if(!Array.prototype.flat) {
	Array.prototype.flat = flat;
}