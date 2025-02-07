import { accessor } from "../../support/accessor";

import { Array } from "../../native/Array";
import { isArray as modern_isArray } from "../../impl/Array/isArray";
import { isArray as compat_isArray } from "../../impl-compat/Array/isArray";

if(!Array.isArray) {
	Array.isArray = accessor ? modern_isArray : compat_isArray;
}