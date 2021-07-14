import "./values";
import Symbol_iterator from "sky-core/pure/Symbol/iterator";

if(!Array.prototype[Symbol_iterator]) {
	Array.prototype[Symbol_iterator] = Array.prototype.values;
}