import { trimEnd } from "../../../impl/String/prototype/trimEnd";
if(!String.prototype.trimRight) {
	String.prototype.trimRight = trimEnd;
}