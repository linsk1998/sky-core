import modern_for from "../../impl-modern/Symbol/for";
import compat_for from "../../impl-compat/Symbol/for";
import { Symbol } from "../../native/Symbol";
export default Symbol ? (Symbol.for || modern_for) : compat_for;