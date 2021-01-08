import { RegExpIterator } from "../../../impl/String/prototype/matchAll";
if(!String.prototype.matchAll) {
	String.prototype.matchAll = function(regexp) {
		return new RegExpIterator(this, regexp);
	};
}