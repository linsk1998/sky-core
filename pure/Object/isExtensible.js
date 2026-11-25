import { isExtensible as native_isExtensible } from "../../native/Object/isExtensible";
import { isExtensible } from "../../impl/object/restrict/isExtensible";

export default native_isExtensible || isExtensible;
