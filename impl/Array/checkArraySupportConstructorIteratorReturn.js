import { Array } from "../../native/Array";


// 只有原生支持Symbol.iterator的情况下才会调用这个函数
var arrayConstructorIteratorReturn = false;
export function checkArraySupportConstructorIteratorReturn() {
	try {
		var called = 0;
		var iteratorWithReturn = {
			next: function() {
				return { done: !!called++ };
			},
			return: function() {
				arrayConstructorIteratorReturn = true;
			}
		};
		iteratorWithReturn[Symbol.iterator] = function() {
			return this;
		};
		Array.from(iteratorWithReturn);
	} catch(error) { /* empty */ }
	checkArraySupportConstructorIteratorReturn = function() {
		return arrayConstructorIteratorReturn;
	};
	return arrayConstructorIteratorReturn;
}
