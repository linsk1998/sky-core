import { checkSetLike } from "../checkSetLike$ie11";
import { enumSetLikeHelper } from "../enumSetLikeHelper";

// IE11 兼容版：set-like 对象允许只有 forEach 没有 keys
export function isSupersetOf(other) {
	checkSetLike(other);
	if(this.size < other.size) {
		return false;
	}
	var self = this;
	var result = true;
	var _step;
	if(other.keys) {
		var _iterator = enumSetLikeHelper(other);
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
	} else {
		// forEach 无法提前终止，用异常中断
		var BREAK = {};
		try {
			other.forEach(function(value) {
				if(!self.has(value)) {
					throw BREAK;
				}
			});
		} catch(e) {
			if(e === BREAK) {
				return false;
			}
			throw e;
		}
	}
	return result;
};
