import "core-js/modules/es.global-this";
import "core-js/modules/es.object.define-property";
if(globalThis.Element) {
	if(!('previousElementSibling' in document.head)){
		Object.defineProperty(Element.prototype,"previousElementSibling", {
			get:function(){
				var e = this.previousSibling;
				while(e && 1 !== e.nodeType)
					e = e.previousSibling;
				return e;
			}
		});
	}
	if(!('nextElementSibling' in document.head)){
		Object.defineProperty(Element.prototype,"nextElementSibling", {
			get:function(){
				var e = this.nextSibling;
				while(e && 1 !== e.nodeType)
					e = e.nextSibling;
				return e;
			}
		});
	}
}