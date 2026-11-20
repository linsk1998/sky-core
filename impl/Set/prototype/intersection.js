import { checkSetLike } from "../checkSetLike";
import { enumSetLikeHelper } from "../enumSetLikeHelper";

export function intersection(other) {
	checkSetLike(other);
	var self = this;
	var result = new Set();
	var _step;
	if(this.size <= other.size) {
		// 遍历 this，用 other.has 判断；此时不读取 other.keys
		var iterator = this.keys();
		var next;
		while(!(next = iterator.next()).done) {
			if(other.has(next.value)) {
				result.add(next.value);
			}
		}
	} else {
		// 遍历 other 的 keys，用 this.has 判断；结果顺序与 other 一致
		var _iterator = enumSetLikeHelper(other);
		try {
			for(_iterator.s(); !(_step = _iterator.n()).done;) {
				if(self.has(_step.value)) {
					result.add(_step.value);
				}
			}
		} catch(err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}
	}
	return result;
};
