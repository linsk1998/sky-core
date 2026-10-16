
import { Map } from "../native/Map";
import { create_Map } from "../impl/Map/create_Map";
if(!Map) {
	window.Map = create_Map();
}
