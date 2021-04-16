import { filter } from "../../../impl/Array/prototype/filter";
if(!Array.prototype.filter) {
	Array.prototype.filter = filter;
}