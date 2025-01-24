import { Proxy } from "../../native/Proxy";
import { revocable } from "../../impl/Proxy/revocable";

if(!Proxy.revocable) {
	Proxy.revocable = revocable;
}