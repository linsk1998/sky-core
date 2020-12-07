
import { Map as GMap } from "../native/Map";
import { Map as compat_Map } from "../impl-compat/Map";
if(!GMap) {
	this.Map = compat_Map;
}