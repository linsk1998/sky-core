import { Symbol } from "sky-core/pure/Symbol";
import { Map as GMap } from "../native/Map";
import { Map as modern_Map } from "../impl-modern/Map";
import { Map as compat_Map } from "../impl-compat/Map";
export var Map = (GMap && modern_Map.prototype[Symbol.iterator]) ? modern_Map : compat_Map;