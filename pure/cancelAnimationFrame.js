import { cancelAnimationFrame as impl_cancelAnimationFrame } from "../impl/cancelAnimationFrame";
import { cancelAnimationFrame as native_cancelAnimationFrame } from "../native/cancelAnimationFrame";

export default native_cancelAnimationFrame ? native_cancelAnimationFrame : impl_cancelAnimationFrame;
