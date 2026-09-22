import { Proxy } from "../../native/Proxy";
import { revocable } from "../../impl/Proxy/revocable";

export default Proxy && Proxy.revocable || revocable;