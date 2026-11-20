import { checkSetLike } from "../checkSetLike";

export function isSubsetOf(other) {
	checkSetLike(other);
	if(this.size > other.size) {
		return false;
	}
	// this 是真正的 Set，keys 迭代器无需关闭处理
	var iterator = this.keys();
	var next;
	while(!(next = iterator.next()).done) {
		if(!other.has(next.value)) {
			return false;
		}
	}
	return true;
};
