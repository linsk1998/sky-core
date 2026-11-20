import { checkSetLike } from "../checkSetLike$ie11";
import { enumSetLikeHelper } from "../enumSetLikeHelper";

// IE11 兼容版：set-like 对象允许只有 forEach 没有 keys
export function isDisjointFrom(other) {
	checkSetLike(other);
	var self = this;
	var result = true;
	var _step;
	if(this.size <= other.size) {
		// 遍历 this，用 other.has 判断；此时不读取 other.keys
		var iterator = this.keys();
		var next;
		while(!(next = iterator.next()).done) {
			if(other.has(next.value)) {
				return false;
			}
		}
	} else if(other.keys) {
		// 遍历 other 的 keys，用 this.has 判断
		var _iterator = enumSetLikeHelper(other);
		try {
			for(_iterator.s(); !(_step = _iterator.n()).done;) {
				if(self.has(_step.value)) {
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
				if(self.has(value)) {
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
