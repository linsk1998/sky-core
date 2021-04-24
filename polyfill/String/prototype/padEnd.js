import { padEnd } from "../../../impl/String/prototype/padEnd";
if(!String.prototype.padEnd) {
	String.prototype.padEnd = padEnd;
}