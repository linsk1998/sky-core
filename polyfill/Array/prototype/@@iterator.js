import "./entries";
if(!Array.prototype[Symbol.iterator]) {
	Array.prototype[Symbol.iterator] = Array.prototype.entries;
}