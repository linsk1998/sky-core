import { Proxy } from "../Proxy";
import { revocable } from "../../impl/Proxy/revocable";

if(!Proxy.revocable) {
	Proxy.revocable = revocable;
}
