import { cancelIdleCallback as impl_cancelIdleCallback } from "../impl/cancelIdleCallback";
import { cancelIdleCallback as native_cancelIdleCallback } from "../native/cancelIdleCallback";

export default native_cancelIdleCallback ? native_cancelIdleCallback : impl_cancelIdleCallback;
