import { Object } from "../../native/Object";
import { hasOwn } from "../../impl/object/enum/hasOwn";

export default Object.hasOwn || hasOwn;
