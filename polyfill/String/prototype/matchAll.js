import { matchAll } from "../../../impl/String/prototype/matchAll";
if(!String.prototype.matchAll) {
	String.prototype.matchAll = matchAll;
}