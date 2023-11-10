import { inherits } from "sky-core";
function AggregateError(errors, message) {
	if(!(this instanceof AggregateError)) {
		return new AggregateError(errors, message);
	}
	this.errors = errors;
	this.name = "AggregateError";
	this.message = message;
}
inherits(AggregateError, Error);
export { AggregateError };