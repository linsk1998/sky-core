
import { apply } from "./apply";

export function construct(target, argumentsList, NewTarget) {
	var o = Object.create(target.prototype);
	if(!NewTarget) { NewTarget = o; }
	var o2 = apply(target, NewTarget, argumentsList);
	if(o2 !== void 0) {
		return o2;
	}
	return o;
};
construct.sham = true;