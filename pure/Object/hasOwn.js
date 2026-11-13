import { Object } from "../../native/Object";
import { hasEnumBug } from "../../utils/hasEnumBug";
import { hasOwn } from "../../impl/object/enum/hasOwn";
import { hasOwn$jscript } from "../../impl/object/enum/hasOwn$jscript";

export default Object.hasOwn || (hasEnumBug ? hasOwn$jscript : hasOwn);
