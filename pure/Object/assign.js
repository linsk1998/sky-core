import { assign } from "../../impl/object/enum/assign";
import { Symbol } from "../../native/Symbol";
export default Symbol ? Object.assign : assign;