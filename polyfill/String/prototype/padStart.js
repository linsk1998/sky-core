import { padStart } from "../../../impl/String/prototype/padStart";
if(!String.prototype.padStart) {
	String.prototype.padStart = padStart;
}