import { Date } from "../../native/Date";
import { Date as Date$iso } from "../../impl/Date/constructor";
if(isNaN(new Date("2011-11-11T11:11:11.111Z"))) {
	Date$iso.UTC = Date.UTC;
	Date$iso.now = Date.now;
	Date$iso.parse = function(str) {
		return new Date$iso(str).getTime();
	};
	window.Date = Date$iso;
}
