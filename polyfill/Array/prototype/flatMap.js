import { flatMap } from "../../../impl/Array/prototype/flatMap";
if(!Array.prototype.flatMap) {
	Array.prototype.flatMap = flatMap;
}