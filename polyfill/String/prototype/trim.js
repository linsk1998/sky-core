import { trim } from "../../../impl/String/prototype/trim";
if(!String.prototype.trim) {
	String.prototype.trim = trim;
}