import { includes } from "../../../impl/String/prototype/includes";
if(!String.prototype.includes) {
	String.prototype.includes = includes;
}