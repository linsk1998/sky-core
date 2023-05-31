import { Error as native_Error } from "../native/Error";

function Error(message) {
	this.message = message;
}
Error.prototype = native_Error.prototype;
window.Error = Error;