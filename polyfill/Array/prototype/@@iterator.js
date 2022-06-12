import "./values";
import iterator from "sky-core/pure/Symbol/iterator";

if(!Array.prototype[iterator]) {
	Array.prototype[iterator] = Array.prototype.values;
}