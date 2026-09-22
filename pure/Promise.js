import { Promise } from "../native/Promise";
import { Promise as impl_Promise } from "../impl/Promise";

export default Promise || impl_Promise;