
if(this.Element) {
	if(!('previousElementSibling' in Element.prototype)) {
		Object.defineProperty(Element.prototype, "previousElementSibling", {
			get: function() {
				var e = this.previousSibling;
				while(e && 1 !== e.nodeType)
					e = e.previousSibling;
				return e;
			}
		});
	}
	if(!('nextElementSibling' in Element.prototype)) {
		Object.defineProperty(Element.prototype, "nextElementSibling", {
			get: function() {
				var e = this.nextSibling;
				while(e && 1 !== e.nodeType)
					e = e.nextSibling;
				return e;
			}
		});
	}
}