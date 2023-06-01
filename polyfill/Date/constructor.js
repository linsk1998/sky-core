import { Date } from "../../native/Date";
import { Date as compat_Date } from "../../impl-compat/Date";
if(isNaN(new Date("2011-11-11T11:11:11.111Z"))) {
	compat_Date.UTC = Date.UTC;
	compat_Date.now = Date.now;
	compat_Date.parse = function(str) {
		return new compat_Date(str).getTime();
	};
	window.Date = compat_Date;
}