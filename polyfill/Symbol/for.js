import "../Symbol";
import compat_for from "../../impl-compat/Symbol/for";
import modern_for from "../../impl-modern/Symbol/for";
if(!('for' in Symbol)) {
	Symbol['for'] = Symbol ? modern_for : compat_for;
}