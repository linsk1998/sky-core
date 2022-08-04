
var native_Error = window.Error;
function Error(message) {
	this.message = message;
}
Error.prototype = native_Error.prototype;
window.Error = Error;