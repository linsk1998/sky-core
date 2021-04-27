import "../Symbol";
import { Symbol as native_Symbol } from "../../native/Symbol";
import compat_for from "../../impl-compat/Symbol/for";
import modern_for from "../../impl-modern/Symbol/for";
if(!('for' in Symbol)) {
	Symbol['for'] = native_Symbol ? modern_for : compat_for;
}