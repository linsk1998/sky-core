import { getSetRecord } from "../getSetRecord";
import { getIteratorRecord, iteratorStepValue } from "../getIteratorRecord";

export function intersection(other) {
	if(!(this instanceof Set)) {
		throw new TypeError('Set.prototype.intersection called on incompatible receiver');
	}
	var otherRec = getSetRecord(other);
	var result = new Set();
	var iterator, next, value;
	if(this.size <= otherRec.size) {
		// 遍历 this，用 other.has 判断；此时不调用 other.keys
		iterator = this.keys();
		while(true) {
			next = iterator.next();
			if(next.done) {
				break;
			}
			value = next.value;
			if(otherRec.has.call(otherRec.set, value)) {
				result.add(value);
			}
		}
	} else {
		// 遍历 other.keys，用 this.has 判断；结果顺序与 other 一致
		iterator = getIteratorRecord(otherRec);
		while(true) {
			next = iteratorStepValue(iterator);
			if(next.done) {
				break;
			}
			value = next.value;
			if(this.has(value)) {
				result.add(value);
			}
		}
	}
	return result;
};
