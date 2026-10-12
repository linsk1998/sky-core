import { requestAnimationFrame as impl_requestAnimationFrame } from "../impl/requestAnimationFrame";
import { requestAnimationFrame as native_requestAnimationFrame } from "../native/requestAnimationFrame";

export default native_requestAnimationFrame ? native_requestAnimationFrame : impl_requestAnimationFrame;
