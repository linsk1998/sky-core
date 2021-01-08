
import { Map } from "../native/Map";
import { createMap } from "../impl-compat/Map";
if(!Map) {
	this.Map = createMap();
}