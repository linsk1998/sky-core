import { Symbol } from "../../polyfill/Symbol";
import es3_for from "../../impl/Symbol/for$es3";

if(!('for' in Symbol)) {
	Symbol['for'] = es3_for;
}
