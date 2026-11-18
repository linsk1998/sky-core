import { getSetRecord } from "../getSetRecord";
import { getIteratorRecord, iteratorStepValue } from "../getIteratorRecord";

export function union(other) {
	if(!(this instanceof Set)) {
		throw new TypeError('Set.prototype.union called on incompatible receiver');
	}
	var otherRec = getSetRecord(other);
	// 规范要求先取得 other 的迭代器记录（含 next），再复制 this
	var keysIter = getIteratorRecord(otherRec);
	var result = new Set(this);
	while(true) {
		var next = iteratorStepValue(keysIter);
		if(next.done) {
			break;
		}
		result.add(next.value);
	}
	return result;
};
