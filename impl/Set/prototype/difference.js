import { getSetRecord } from "../getSetRecord";
import { getIteratorRecord, iteratorStepValue } from "../getIteratorRecord";

export function difference(other) {
	if(!(this instanceof Set)) {
		throw new TypeError('Set.prototype.difference called on incompatible receiver');
	}
	var otherRec = getSetRecord(other);
	// 规范要求先复制 this，后续判断与遍历不再读取 this 的实时数据
	var result = new Set(this);
	if(result.size !== 0) {
		if(this.size <= otherRec.size) {
			// this 较小：遍历副本，用 other.has 判断，命中则从结果中删除
			result.forEach(function(value) {
				if(otherRec.has.call(otherRec.set, value)) {
					result.delete(value);
				}
			});
		} else {
			// 遍历 other.keys，从副本中删除
			var keysIter = getIteratorRecord(otherRec);
			var next;
			while(true) {
				next = iteratorStepValue(keysIter);
				if(next.done) {
					break;
				}
				result.delete(next.value);
			}
		}
	}
	return result;
};
