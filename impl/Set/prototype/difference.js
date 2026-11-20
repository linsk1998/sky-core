import { checkSetLike } from "../checkSetLike";
import { enumSetLikeHelper } from "../enumSetLikeHelper";

export function difference(other) {
	checkSetLike(other);
	// 规范要求先复制 this，后续判断与遍历不再读取 this 的实时数据
	var result = new Set(this);
	var _step;
	if(result.size !== 0) {
		if(this.size <= other.size) {
			// this 较小：遍历副本，用 other.has 判断，命中则从结果中删除
			result.forEach(function(value) {
				if(other.has(value)) {
					result.delete(value);
				}
			});
		} else {
			// 遍历 other 的 keys，从副本中删除
			var _iterator = enumSetLikeHelper(other);
			try {
				for(_iterator.s(); !(_step = _iterator.n()).done;) {
					result.delete(_step.value);
				}
			} catch(err) {
				_iterator.e(err);
			} finally {
				_iterator.f();
			}
		}
	}
	return result;
};
