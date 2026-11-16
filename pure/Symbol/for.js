import es6_for from "../../impl/Symbol/for$es6";
import es3_for from "../../impl/Symbol/for$es3";
import { Symbol } from "../../native/Symbol";
export default Symbol ? (Symbol.for || es6_for) : es3_for;
