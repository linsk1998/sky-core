import { Promise } from "../../native/Promise";
import { allSettled } from "../../impl/Promise/allSettled";
export default (Promise && Promise.allSettled) ? Promise.allSettled : allSettled;