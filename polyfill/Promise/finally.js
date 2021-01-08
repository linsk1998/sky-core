import "../Promise";
import promise_finally from "../../impl/Promise/finally";
if(!Promise.finally) {
	Promise.finally = promise_finally;
}