import { assign } from "../../impl/Object/assign";
import { Symbol } from "../../native/Symbol";
export default Symbol ? Object.assign : assign;