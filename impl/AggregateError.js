import { inherits } from "sky-core";
import { Error } from "../native/Error";

function AggregateError(errors, message) {
	if(!(this instanceof AggregateError)) {
		return new AggregateError(errors, message);
	}
	this.errors = errors;
	this.message = message === undefined ? "" : String(message);
	var options = arguments[2];
	if(typeof options === "object" && options !== null) {
		if('cause' in options) {
			this.cause = options.cause;
		}
	}
}
inherits(AggregateError, Error);
AggregateError.prototype.name = "AggregateError";
export { AggregateError };