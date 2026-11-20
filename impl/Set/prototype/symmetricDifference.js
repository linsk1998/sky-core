import { checkSetLike } from "../checkSetLike";
import { enumSetLikeHelper } from "../enumSetLikeHelper";

export function symmetricDifference(other) {
	checkSetLike(other);
	// 规范要求先取 other 的迭代器，再复制 this
	var _iterator = enumSetLikeHelper(other), _step;
	var result = new Set(this);
	var self = this;
	try {
		for(_iterator.s(); !(_step = _iterator.n()).done;) {
			// 以 this 的成员关系为准，保证 other 中重复值只删除不重复添加
			if(self.has(_step.value)) {
				result.delete(_step.value);
			} else {
				result.add(_step.value);
			}
		}
	} catch(err) {
		_iterator.e(err);
	} finally {
		_iterator.f();
	}
	return result;
};
