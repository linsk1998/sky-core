

var native_Error = window.Error;
function Error(message) {
	this.message = message;
	var _this = native_Error.call(this, message);
	if(_this) {
		this.columnNumber = _this.columnNumber;
		this.fileName = _this.fileName;
		this.lineNumber = _this.lineNumber;
		this.name = _this.name;
		this.stack = _this.stack;
	}
}
Error.prototype = native_Error.prototype;
window.Error = Error;