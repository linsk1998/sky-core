import { copyWithin } from "../../../impl/Array/prototype/copyWithin";
if(!Array.prototype.copyWithin) {
	Array.prototype.copyWithin = copyWithin;
}