import { getSetRecord } from "../getSetRecord$ie11";
import { getIteratorRecord, iteratorStepValue } from "../getIteratorRecord";

// IE11 兼容版：set-like 对象允许只有 forEach 没有 keys
export function union(other) {
	if(!(this instanceof Set)) {
		throw new TypeError('Set.prototype.union called on incompatible receiver');
	}
	var otherRec = getSetRecord(other);
	var result, iter, next;
	if(otherRec.keys) {
		// 规范要求先取得 other 的迭代器记录（含 next），再复制 this
		// 此顺序用于规避 WebKit bug（keys() 执行期间修改了 this）
		iter = getIteratorRecord(otherRec);
		result = new Set(this);
		while(true) {
			next = iteratorStepValue(iter);
			if(next.done) {
				break;
			}
			result.add(next.value);
		}
	} else {
		result = new Set(this);
		otherRec.forEach.call(otherRec.set, function(value) {
			result.add(value);
		});
	}
	return result;
};
