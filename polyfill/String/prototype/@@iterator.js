import { Symbol } from "../../../native/Symbol";
import { iterator } from "../../../impl/String/prototype/@@iterator";
import { toES6Iterator } from "../../../utils-modern/toES6Iterator";
if(!Symbol) {
	if(!String.prototype['@@iterator']) {
		String.prototype['@@iterator'] = iterator;
	} else if(String.prototype.iterator) {
		String.prototype['@@iterator'] = function() {
			return toES6Iterator(this.iterator());
		};
	}
}
