import { DOMException as native_DOMException } from "../native/DOMException";
import { Error } from "../native/Error";

try {
	new native_DOMException();
} catch(err) {
	function DOMException(message, name) {
		this.message = message;
		this.name = name;
	};
	DOMException.prototype = Object.create(Error.prototype);
	DOMException.prototype.constructor = DOMException;
	window.DOMException = DOMException;
}