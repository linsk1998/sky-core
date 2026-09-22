if(window.CSSStyleSheet) {
	if(!('rules' in CSSStyleSheet.prototype) && ('cssRules' in CSSStyleSheet.prototype)) {
		Object.defineProperty(CSSStyleSheet.prototype, 'rules', {
			enumerable: false,
			configurable: false,
			get: function() {
				return this.cssRules;
			}
		});
	}
}