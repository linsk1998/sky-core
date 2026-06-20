import { Symbol } from "../../native/Symbol";
import { keys as native_keys } from "../../native/Object/keys";
import { keys$es3 } from "../../impl/object/enum/keys$es3";
import { keys$fixSymbol } from "../../impl/object/enum/keys$fixSymbol";
export default !native_keys ? keys$es3 : (Symbol ? native_keys : keys$fixSymbol);
