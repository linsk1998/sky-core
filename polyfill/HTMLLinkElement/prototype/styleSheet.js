if(window.HTMLLinkElement) {
	if(!('styleSheet' in HTMLLinkElement.prototype) && ('sheet' in HTMLLinkElement.prototype)) {
		Object.defineProperty(HTMLLinkElement.prototype, 'styleSheet', {
			enumerable: false,
			configurable: false,
			get: function() {
				return this.sheet;
			}
		});
	}
}