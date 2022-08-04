import { Promise } from "../../../native/Promise";
import promise_finally from "../../../impl/Promise/finally";
export default (Promise && Promise.prototype.finally) ? Promise.prototype.finally : promise_finally;