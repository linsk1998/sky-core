import { getSetRecord } from "../getSetRecord$ie11";
import { getIteratorRecord, iteratorStepValue } from "../getIteratorRecord";

// IE11 兼容版：set-like 对象允许只有 forEach 没有 keys
export function intersection(other) {
	if(!(this instanceof Set)) {
		throw new TypeError('Set.prototype.intersection called on incompatible receiver');
	}
	var otherRec = getSetRecord(other);
	var result = new Set();
	if(this.size <= otherRec.size) {
		// 遍历 this，用 other.has 判断；此时不调用 other.keys/forEach
		var iterator = this.keys();
		var next, value;
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
	} else if(otherRec.keys) {
		// 遍历 other.keys，用 this.has 判断；结果顺序与 other 一致
		var keysIter = getIteratorRecord(otherRec);
		while(true) {
			var step = iteratorStepValue(keysIter);
			if(step.done) {
				break;
			}
			value = step.value;
			if(this.has(value)) {
				result.add(value);
			}
		}
	} else {
		otherRec.forEach.call(otherRec.set, function(value) {
			if(this.has(value)) {
				result.add(value);
			}
		}.bind(this));
	}
	return result;
};
