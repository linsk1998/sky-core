import { prefixIntrger2 as pad2 } from "../../../utils/prefixIntrger2";
export function toLocaleFormat(date, format) {
	var Y = date.getFullYear();
	var M = pad2(date.getMonth() + 1);
	var D = pad2(date.getDate());
	var h = pad2(date.getHours());
	var m = pad2(date.getMinutes());
	var s = pad2(date.getSeconds());
	var o = {
		"%x": Y + "/" + M + "/" + D,
		"%X": h + ":" + m + ":" + s,
		"%Y": Y,
		"%y": pad2(date.getYear() % 100),
		"%m": M,
		"%e": date.getDate(),
		"%d": D,
		"%H": h,
		"%i": pad2(date.getHours() % 12),
		"%M": m,
		"%S": s,
		"%p": date.getHours() % 12 > 1 ? "PM" : "AM",
		"%%": "%"
	};
	o["%T"] = o["%X"];
	return format.replace(/%[xXTYymedHiMSp%]/g, function(word) {
		for(var k in o) {
			if(k == word) {
				return o[k];
			}
		}
		return word;
	});
}