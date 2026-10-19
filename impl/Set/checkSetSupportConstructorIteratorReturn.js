import { Set as GSet } from "../../native/Set";
import { Symbol } from "../../native/Symbol";

// 只有原生支持Symbol.iterator的情况下才会调用这个函数
var setConstructorIteratorReturn = false;
export function checkSetSupportConstructorIteratorReturn() {
	try {
		var called = 0;
		var iteratorWithReturn = {
			next: function() {
				return { done: !!called++ };
			},
			return: function() {
				setConstructorIteratorReturn = true;
			}
		};
		iteratorWithReturn[Symbol.iterator] = function() {
			return this;
		};
		new GSet(iteratorWithReturn);
	} catch(error) { /* empty */ }
	checkSetSupportConstructorIteratorReturn = function() {
		return setConstructorIteratorReturn;
	};
	return setConstructorIteratorReturn;
}
