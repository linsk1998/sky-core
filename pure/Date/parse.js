
import { Date as compat_Date } from "../../impl-compat/Date";
export default (function() {
	if(isNaN(Date.parse("2011-11-11T11:11:11.111Z"))) {
		return compat_Date.parse;
	} else {
		return Date.parse;
	}
})();