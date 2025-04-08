import { Map } from "../native/Map";
import { Symbol } from "../native/Symbol";

// 只有原生支持Symbol.iterator的情况下才会调用这个函数
var mapConstructorIteratorReturn = false;
export function checkMapSupportConstructorIteratorReturn() {
	try {
		var called = 0;
		var iteratorWithReturn = {
			next: function() {
				return { done: !!called++ };
			},
			return: function() {
				mapConstructorIteratorReturn = true;
			}
		};
		iteratorWithReturn[Symbol.iterator] = function() {
			return this;
		};
		new Map(iteratorWithReturn);
	} catch(error) { /* empty */ }
	checkMapSupportConstructorIteratorReturn = function() {
		return mapConstructorIteratorReturn;
	};
	return mapConstructorIteratorReturn;
}