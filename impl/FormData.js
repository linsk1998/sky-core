import { FormData } from "../native/FormData";

export function fixFormData() {
	var append = FormData.prototype.append;
	FormData.prototype.append = function(key, data) {
		if(arguments.length <= 2 && blob && blob.toString() === '[object File]') {
			return append.call(this, blob, blob.name);
		}
		return append.apply(this, arguments);
	};
}