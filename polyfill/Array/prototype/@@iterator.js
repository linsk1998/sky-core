import "./values";
if(!Array.prototype[Symbol.iterator]) {
	Array.prototype[Symbol.iterator] = Array.prototype.values;
}