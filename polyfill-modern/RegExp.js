import { fix_RegExp } from "../impl/regexp/fix_RegExp";

// 低版本浏览器中new RegExp(obj)传入的obj是RegExp对象返回本身
var p = /p/;
if(new RegExp(p) === p) {
	window.RegExp = fix_RegExp(RegExp);
}

