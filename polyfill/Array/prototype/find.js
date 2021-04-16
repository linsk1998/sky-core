import { find } from "../../../impl/Array/prototype/find";
if(!Array.prototype.find) {
	Array.prototype.find = find;
}