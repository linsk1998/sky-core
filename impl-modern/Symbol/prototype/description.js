
export function get_description() {
	var arr = String(this).match(/^Symbol\((\s|\S)*\)$/);
	if(arr) {
		return arr[0];
	}
}