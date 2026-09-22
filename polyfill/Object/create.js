import { Object } from "../../native/Object";
import { create } from "../../native/Object/create";
import { proto } from "../../support/proto";
import { create as compat_create } from "../../impl-compat/Object/create";
import { create as modern_create } from "../../impl-modern/Object/create";

if(!create) {
	if(proto) {
		Object.create = modern_create;
	} else {
		Object.create = compat_create;
	}
}