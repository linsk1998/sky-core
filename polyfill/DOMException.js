import { DOMException as native_DOMException } from "../native/DOMException";
import { createDOMException } from "../impl/DOMException";

try {
	new native_DOMException();
} catch(err) {
	window.DOMException = createDOMException();
}