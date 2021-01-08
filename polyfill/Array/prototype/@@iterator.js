import Symbol from "sky-core/pure/Symbol";
import "./entries";
if(!Array.prototype[Symbol.iterator]) {
	Array.prototype[Symbol.iterator] = Array.prototype.entries;
}