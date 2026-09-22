import { Element } from "../../../native/Element";
import { DOMTokenList } from "../../../impl/DOMTokenList";

var k = 'classList';
if(!(k in Element.prototype)) {
	Object.defineProperty(Element.prototype, k, {
		get: function() {
			return new DOMTokenList(this);
		}
	});
}