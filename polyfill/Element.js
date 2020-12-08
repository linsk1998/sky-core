import { head } from "sky-core/pure/document/head";
import { defineProperty } from "sky-core/pure/Object/defineProperty";
if(this.Element) {
	if(!('previousElementSibling' in head)) {
		defineProperty(Element.prototype, "previousElementSibling", {
			get: function() {
				var e = this.previousSibling;
				while(e && 1 !== e.nodeType)
					e = e.previousSibling;
				return e;
			}
		});
	}
	if(!('nextElementSibling' in head)) {
		defineProperty(Element.prototype, "nextElementSibling", {
			get: function() {
				var e = this.nextSibling;
				while(e && 1 !== e.nodeType)
					e = e.nextSibling;
				return e;
			}
		});
	}
}