import "../Symbol";
import compat_for from "../../impl-compat/Symbol/for";
if(!('for' in Symbol)) {
	Symbol['for'] = compat_for;
}