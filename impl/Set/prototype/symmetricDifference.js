import { getSetRecord } from "../getSetRecord";
import { getIteratorRecord, iteratorStepValue } from "../getIteratorRecord";

export function symmetricDifference(other) {
	if(!(this instanceof Set)) {
		throw new TypeError('Set.prototype.symmetricDifference called on incompatible receiver');
	}
	var otherRec = getSetRecord(other);
	// 规范要求先取得 other 的迭代器记录，再复制 this（WebKit bug 289430）
	var keysIter = getIteratorRecord(otherRec);
	var result = new Set(this);
	var next, value;
	while(true) {
		next = iteratorStepValue(keysIter);
		if(next.done) {
			break;
		}
		value = next.value;
		// 以 this 的成员关系为准，保证 other 中重复值只删除不重复添加
		if(this.has(value)) {
			result.delete(value);
		} else {
			result.add(value);
		}
	}
	return result;
};
