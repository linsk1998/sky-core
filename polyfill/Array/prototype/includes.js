import { includes } from "../../../impl/Array/prototype/includes";
if(!Array.prototype.includes) {
	Array.prototype.includes = includes;
}