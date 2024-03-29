import { accessor } from "../../../support/accessor";
if(accessor) {
	if(!('name' in Function.prototype)) {
		Object.defineProperty(Function.prototype, 'name', {
			enumerable: false, configurable: true,
			get: function() {
				return Function.prototype.toString.call(this).match(/function\s*([^(]*)\(/)[1];
			}
		});
	}
}