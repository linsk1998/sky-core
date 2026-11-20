import { checkSetLike } from "../checkSetLike";
import { enumSetLikeHelper } from "../enumSetLikeHelper";

export function union(other) {
	checkSetLike(other);
	// 规范要求先取 other 的迭代器，再复制 this
	var _iterator = enumSetLikeHelper(other), _step;
	var result = new Set(this);
	try {
		for(_iterator.s(); !(_step = _iterator.n()).done;) {
			result.add(_step.value);
		}
	} catch(err) {
		_iterator.e(err);
	} finally {
		_iterator.f();
	}
	return result;
};
