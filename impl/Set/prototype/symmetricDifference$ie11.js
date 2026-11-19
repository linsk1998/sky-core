import { getSetRecord } from "../getSetRecord$ie11";
import { getIteratorRecord, iteratorStepValue } from "../getIteratorRecord";

// IE11 兼容版：set-like 对象允许只有 forEach 没有 keys
export function symmetricDifference(other) {
	if(!(this instanceof Set)) {
		throw new TypeError('Set.prototype.symmetricDifference called on incompatible receiver');
	}
	var otherRec = getSetRecord(other);
	var self = this;
	var result, keysIter, next, value;
	if(otherRec.keys) {
		// 规范要求先取得 other 的迭代器记录，再复制 this（WebKit bug 289430）
		keysIter = getIteratorRecord(otherRec);
		result = new Set(this);
		while(true) {
			next = iteratorStepValue(keysIter);
			if(next.done) {
				break;
			}
			value = next.value;
			// 以 this 的成员关系为准，保证 other 中重复值只删除不重复添加
			if(self.has(value)) {
				result.delete(value);
			} else {
				result.add(value);
			}
		}
	} else {
		result = new Set(this);
		otherRec.forEach.call(otherRec.set, function(value) {
			if(self.has(value)) {
				result.delete(value);
			} else {
				result.add(value);
			}
		});
	}
	return result;
};
