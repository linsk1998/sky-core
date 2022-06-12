import { codePointAt } from "../../../impl/String/prototype/codePointAt";
if(!String.prototype.codePointAt) {
	String.prototype.codePointAt = codePointAt;
}