import { indexOf } from "../../../impl/Array/prototype/indexOf";
if(!Array.prototype.indexOf) {
	Array.prototype.indexOf = indexOf;
}