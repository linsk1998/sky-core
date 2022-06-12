import { trimStart } from "../../../impl/String/prototype/trimStart";
if(!String.prototype.trimLeft) {
	String.prototype.trimLeft = trimStart;
}