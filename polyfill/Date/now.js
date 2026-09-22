import { Date } from "../../native/Date";
import { now } from "../../impl/Date/now";

if(!Date.now) {
	Date.now = now;
}