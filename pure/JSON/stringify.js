import { JSON } from "../../native/JSON";
import { stringify } from "../../impl-compat/JSON/stringify";
export default JSON ? JSON.stringify : stringify;