import { lastIndexOf } from "../../../impl/Array/prototype/lastIndexOf";
if(!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = lastIndexOf;
}