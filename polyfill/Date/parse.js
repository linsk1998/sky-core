import { Date } from "../../native/Date";
import { Date as Date$iso } from "../../impl/Date/constructor";

if(isNaN(Date.parse("2011-11-11T11:11:11.111Z"))) {
	Date.parse = Date$iso.parse;
}