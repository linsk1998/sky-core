import { entries } from "../../../impl/Array/prototype/entries";
if(!Array.prototype.entries) {
	Array.prototype.entries = entries;
}