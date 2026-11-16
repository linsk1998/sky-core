import { keyFor as es6_keyFor } from "../../impl/Symbol/keyFor$es6";
import { keyFor as es3_keyFor } from "../../impl/Symbol/keyFor$es3";
import { Symbol } from "../../native/Symbol";
export default Symbol ? (Symbol.keyFor || es6_keyFor) : es3_keyFor;
