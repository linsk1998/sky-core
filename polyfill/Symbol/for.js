import { Symbol } from "../Symbol";
import impl_for from "sky-core/pure/Symbol/for";

if(!('for' in Symbol)) {
	Symbol['for'] = impl_for;
}