import { preventExtensions as native_preventExtensions } from "../../native/Object/preventExtensions";
import { preventExtensions } from "../../impl/Object/preventExtensions";

export default native_preventExtensions || preventExtensions;