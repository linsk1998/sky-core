import "../Symbol";
import compat_for from "../../impl-compat/Symbol/for";
var Symbol = this.Symbol;
if(!('for' in Symbol)) {
	Symbol['for'] = compat_for;
}