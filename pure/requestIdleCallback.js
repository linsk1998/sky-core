import { requestIdleCallback as impl_requestIdleCallback } from "../impl/requestIdleCallback";
import { requestIdleCallback as native_requestIdleCallback } from "../native/requestIdleCallback";

export default native_requestIdleCallback ? native_requestIdleCallback : impl_requestIdleCallback;
