import { JSON } from "../../native/JSON";
import { stringify } from "../../impl/JSON/stringify";
export default JSON ? JSON.stringify : stringify;