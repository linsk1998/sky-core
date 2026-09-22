import { create } from "../../native/Object/create";
import { proto } from "../../support/proto";
import { create as modern_create } from "../../impl-modern/Object/create";
import { create as compat_create } from "../../impl-compat/Object/create";

export default create || (proto ? modern_create : compat_create);