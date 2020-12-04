import "../globalThis";
import { Date as compat_Date } from "../../impl-compat/Date";
if(isNaN(new Date("2011-11-11T11:11:11.111Z"))) {
	globalThis.Date = compat_Date;
}