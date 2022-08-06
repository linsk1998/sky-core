import { JSON } from "../../native/JSON";
export default JSON ? JSON.parse : new Function("json", "return eval('(' + json + ')')");