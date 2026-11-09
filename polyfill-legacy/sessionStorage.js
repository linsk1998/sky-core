import defineProperty from "sky-core/pure/Object/defineProperty";
import { Storage } from "../impl/storage/Storage";

var sessionStorage = window.sessionStorage;

if(!sessionStorage) {
	// Chrome 4 的 sessionStorage 为 null 且属性只读，只能整体替换
	defineProperty(window, "sessionStorage", { value: new Storage(), configurable: true });
} else if(!sessionStorage.clear) {
	// Firefox 3.0 的原生 sessionStorage 没有 clear（3.5 才补充），
	// 且 getItem 返回的是 String 包装对象而不是原始字符串，在这里一并改写
	var nativeGetItem = sessionStorage.getItem;
	defineProperty(sessionStorage, "clear", {
		value: function() {
			var keys = [];
			var length = this.length;
			var i;
			for(i = 0; i < length; i++) {
				keys.push(this.key(i));
			}
			for(i = 0; i < keys.length; i++) {
				this.removeItem(keys[i]);
			}
		},
		configurable: true
	});
	defineProperty(sessionStorage, "getItem", {
		value: function(key) {
			var value = nativeGetItem.call(this, key);
			return typeof value === 'object' && value !== null ? String(value) : value;
		},
		configurable: true
	});
}
