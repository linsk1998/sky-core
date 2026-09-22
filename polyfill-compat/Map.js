
import { Map } from "../native/Map";
import { createMap } from "../impl-compat/Map";
if(!Map) {
	window.Map = createMap();
}