import { toFixed } from "../../../impl/Number/prototype/toFixed";
// from core-js
var native = Number.prototype['toFixed'];
if(native.call(0.00008, 3) !== '0.000' ||
	native.call(0.9, 3) !== '1' ||
	native.call(1.255, 3) !== '1.25' ||
	native.call(1000000000000000128.0, 0) !== '1000000000000000128'
) {
	Number.prototype['toFixed'] = toFixed;
}