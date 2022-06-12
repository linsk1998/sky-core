import { JSON } from "../../native/JSON";
import { parse } from "../../impl/JSON/parse";
export default JSON ? JSON.parse : parse;