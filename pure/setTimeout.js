import { setTimeout as impl_setTimeout } from "../impl/setTimeout";
import { setTimeout as native_setTimeout } from "../native/setTimeout";

export default document.documentMode <= 9 ? impl_setTimeout : native_setTimeout;