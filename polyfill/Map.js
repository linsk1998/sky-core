import { Symbol } from "../native/Symbol";
import { Map } from "../native/Map";
import { fixMap } from "../impl-modern/Map";
import { createMap } from "../impl-compat/Map";
if(Map) {
	if(!Symbol || !Map.prototype[Symbol.iterator]) {
		this.Map = fixMap();
	}
} else {
	this.Map = createMap();
}