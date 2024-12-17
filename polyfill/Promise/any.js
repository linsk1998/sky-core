import Promise from "sky-core/pure/Promise";
import { any } from "../../impl/Promise/any";

if(!Promise.any) {
	Promise.any = any;
}