export function createDOMException() {
	function DOMException(message, name) {
		this.message = message;
		this.name = name;
	};
	DOMException.prototype = Object.create(Error.prototype);
	DOMException.prototype.constructor = DOMException;
	return DOMException;
}