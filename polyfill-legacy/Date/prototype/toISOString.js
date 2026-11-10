import { Date } from "../../../native/Date";
import { toISOString } from "../../../impl/Date/prototype/toISOString";

// legacy 浏览器原生有 toISOString 但实现有 bug：
//   Firefox 3.0 完全没有该方法
//   Chrome 4 缺毫秒部分（'1970-01-01T00:00:00Z'）
//   Chrome 5-10 千年少补零（year 385 → '385-07-25...'）
//   Safari 4-5.1 千年毫秒溢出（'0385-07-25T07:06:39.-01Z'）
//   Firefox 3.5-4 对 NaN 日期不抛 RangeError
var bad = false;
try {
	bad = (
		!Date.prototype.toISOString
		|| new Date(0).toISOString() !== '1970-01-01T00:00:00.000Z'
		|| new Date(-5e13 - 1).toISOString() !== '0385-07-25T07:06:39.999Z'
	);
	if(!bad) {
		new Date(NaN).toISOString();
		bad = true;
	}
} catch(error) {
	if(!(error instanceof RangeError)) bad = true;
}
if(bad) {
	Date.prototype.toISOString = toISOString;
}
