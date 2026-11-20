import { checkSetLike } from "../checkSetLike$ie11";
import { enumSetLikeHelper } from "../enumSetLikeHelper";

// IE11 兼容版：set-like 对象允许只有 forEach 没有 keys
export function symmetricDifference(other) {
	checkSetLike(other);
	var self = this;
	var result;
	var _step;
	if(other.keys) {
		// 规范要求先取 other 的迭代器，再复制 this
		var _iterator = enumSetLikeHelper(other);
		result = new Set(this);
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
	} else {
		result = new Set(this);
		other.forEach(function(value) {
			if(self.has(value)) {
				result.delete(value);
			} else {
				result.add(value);
			}
		});
	}
	return result;
};
