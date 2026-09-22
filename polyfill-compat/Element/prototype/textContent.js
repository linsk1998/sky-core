import { Element } from "../../../native/Element";
import { getElementText } from "../../../utils/getElementText";

var k = 'textContent';
if(Element) {
	if(!(k in Element.prototype)) {
		Object.defineProperty(Element.prototype, k, {
			get: function() {
				return getElementText(this);
			},
			set: function(v) {
				this.innerText = v;
			},
			configurable: true,
			enumerable: false
		});
	}
}