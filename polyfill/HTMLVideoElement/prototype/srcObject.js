if(!('srcObject' in HTMLVideoElement.prototype)) {
	Object.defineProperty(HTMLVideoElement.prototype, 'srcObject', {
		enumerable: false,
		configurable: false,
		get: function() {
			return this._srcObject;
		},
		set: function(value) {
			if(value) {
				this._srcObject = value;
				this.src = URL.createObjectURL(value);
			} else {
				var url = this.src;
				this.removeAttribute('src');
				this._srcObject = null;
				URL.revokeObjectURL(url);
			}
		}
	});
}