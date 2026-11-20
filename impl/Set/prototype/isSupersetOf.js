import { checkSetLike } from "../checkSetLike";
import { enumSetLikeHelper } from "../enumSetLikeHelper";

export function isSupersetOf(other) {
	checkSetLike(other);
	if(this.size < other.size) {
		return false;
	}
	var self = this;
	var result = true;
	var _iterator = enumSetLikeHelper(other), _step;
	try {
		for(_iterator.s(); !(_step = _iterator.n()).done;) {
			if(!self.has(_step.value)) {
				result = false;
				break;
			}
		}
	} catch(err) {
		_iterator.e(err);
	} finally {
		// 提前 break 时 normalCompletion 为 false，会关闭迭代器
		_iterator.f();
	}
	return result;
};
