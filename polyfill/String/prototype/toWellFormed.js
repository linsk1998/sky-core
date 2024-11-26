import { toWellFormed } from "../../../impl/String/prototype/toWellFormed";
if(!String.prototype.toWellFormed) {
	String.prototype.toWellFormed = toWellFormed;
}