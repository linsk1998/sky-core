import { isWellFormed } from "../../../impl/String/prototype/isWellFormed";
if(!String.prototype.isWellFormed) {
	String.prototype.isWellFormed = isWellFormed;
}