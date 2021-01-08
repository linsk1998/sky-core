import { Promise } from "../../native/Promise";
import promise_finally from "../../impl/Promise/finally";
export default (Promise && Promise.finally) ? Promise.finally : promise_finally;