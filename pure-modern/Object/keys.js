import { keys } from "../../native/Object/keys";
import { Symbol } from "../../native/Symbol";
import { keys$fixSymbol } from "../../impl/object/enum/keys$fixSymbol";

export default Symbol ? keys : keys$fixSymbol;
