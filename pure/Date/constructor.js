import { Date } from "../../native/Date";
import { Date as Date$iso } from "../../impl/Date/constructor";
export default (function() {
	if(isNaN(new Date$iso("2011-11-11T11:11:11.111Z"))) {
		return compat_Date;
	}
	return Date;
})();