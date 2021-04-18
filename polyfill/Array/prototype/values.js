import { values } from "../../../impl/Array/prototype/values";
if(!Array.prototype.values) {
	Array.prototype.values = values;
}