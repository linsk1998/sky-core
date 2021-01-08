
import { Date as compat_Date } from "../../impl-compat/Date";
if(isNaN(Date.parse("2011-11-11T11:11:11.111Z"))) {
	Date.parse = compat_Date.parse;
}