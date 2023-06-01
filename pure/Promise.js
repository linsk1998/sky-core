import { Promise } from "../native/Promise";
import { impl_Promise } from "../impl/Promise";
export default Promise || impl_Promise;