import { toFixed } from "../../../impl/Number/prototype/toFixed";
// from core-js
var n = Number.prototype['toFixed'];
if(n.call(0.00008, 3) !== '0.000' ||
	n.call(0.9, 3) !== '1' ||
	n.call(1.255, 3) !== '1.25' ||
	n.call(1000000000000000128.0, 0) !== '1000000000000000128'
) {
	Number.prototype['toFixed'] = toFixed;
}