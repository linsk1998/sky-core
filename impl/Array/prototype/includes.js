import isNaN from "sky-core/pure/Number/isNaN";
export function includes(search) {
	var i = this.length;
	while(i-- > 0) {
		var value = this[i];
		if(value === search || isNaN(value) && isNaN(search)) {
			return true;
		}
	}
	return false;
}