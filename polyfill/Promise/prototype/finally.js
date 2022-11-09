import { Promise } from "../../Promise";
import promise_finally from "../../../impl/Promise/finally";
if(!Promise.prototype.finally) {
	Promise.prototype.finally = promise_finally;
}