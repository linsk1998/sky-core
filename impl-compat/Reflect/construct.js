import {apply} from "./apply";
import {create} from "../Object/create";

export function construct(target, argumentsList,NewTarget){
	var o=create(target.prototype);
	if(!NewTarget){ NewTarget=o;}
	var o2=apply(target,NewTarget,argumentsList);
	if(o2!==void 0){
		return o2;
	}
	return o;
};