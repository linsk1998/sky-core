import { parseInt } from "../native/parseInt";
import { fix_parseInt } from "../impl/Number/parseInt";

if(parseInt("010") === 8) {
	window.parseInt = fix_parseInt(parseInt);
}
