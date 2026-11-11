import { Date as native_Date } from "../../native/Date";
import { Date as Date$iso } from "../../impl/Date/constructor";

// 嗅探：1) 无时区时间串按本地解析 2) 支持 ±HH:mm 偏移
var Date = native_Date;
if(new Date("1995-12-17T03:24:00").getTime() !== new Date(1995, 11, 17, 3, 24, 0).getTime()
	|| new Date("1995-12-17T03:24:00+08:00").getTime() !== Date.UTC(1995, 11, 16, 19, 24, 0)) {
	Date$iso.UTC = Date.UTC;
	Date = Date$iso;
	window.Date = Date;
}
export { Date };
