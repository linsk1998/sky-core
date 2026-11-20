import { checkSetLike } from "../checkSetLike$ie11";
import { enumSetLikeHelper } from "../enumSetLikeHelper";

// IE11 兼容版：set-like 对象允许只有 forEach 没有 keys
export function union(other) {
	checkSetLike(other);
	var result;
	if(other.keys) {
		// 规范要求先取 other 的迭代器，再复制 this
		var _iterator = enumSetLikeHelper(other), _step;
		result = new Set(this);
		try {
			for(_iterator.s(); !(_step = _iterator.n()).done;) {
				result.add(_step.value);
			}
		} catch(err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}
	} else {
		result = new Set(this);
		other.forEach(function(value) {
			result.add(value);
		});
	}
	return result;
};
