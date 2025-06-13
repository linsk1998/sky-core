import { setInterval as impl_setInterval } from "../impl/setInterval";
import { setInterval as native_setInterval } from "../native/setInterval";

export default document.documentMode <= 9 ? impl_setInterval : native_setInterval;