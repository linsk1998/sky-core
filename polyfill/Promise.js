import { Promise as native_Promise } from "../native/Promise";
import { Promise as impl_Promise } from "../impl/Promise";

var Promise = native_Promise;
if(!Promise) {
	Promise = window.Promise = impl_Promise;
}
export { Promise };