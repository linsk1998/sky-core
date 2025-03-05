import { Error as native_Error } from "../native/Error";

function Error(message) {
	this.message = message === undefined ? "" : String(message);
	var options = arguments[1];
	if(typeof options === "object" && options !== null) {
		if('cause' in options) {
			this.cause = options.cause;
		}
	}
}
Error.prototype = native_Error.prototype;
window.Error = Error;