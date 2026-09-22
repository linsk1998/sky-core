import { preventExtensions as native_preventExtensions } from "../../native/Object/preventExtensions";
import { preventExtensions } from "../../impl/object/restrict/preventExtensions";

export default native_preventExtensions || preventExtensions;