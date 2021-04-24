import { repeat } from "../../../impl/String/prototype/repeat";
if(!String.prototype.repeat) {
	String.prototype.repeat = repeat;
}