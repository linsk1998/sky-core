import { reduce } from "../../../impl/Array/prototype/reduce";
if(!Array.prototype.reduce) {
	Array.prototype.reduce = reduce;
}