import { inherits } from "sky-core/utils/inherits";
function AggregateError(errors, message) {
	Error.call(this, message);
	this.errors = errors;
	this.name = "AggregateError";
}
inherits(AggregateError, Error);
export { AggregateError };