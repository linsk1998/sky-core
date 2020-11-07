
import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.set-prototype-of";
import "core-js/modules/es.object.define-property";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.create";
import fixMap from "../impl/Map/fixMap";
import createMap from "../impl/Map/createMap";
if(globalThis.Map){
	fixMap();
	if(!Map.prototype[Symbol.iterator]){
		createMap();
	}
}else{
	createMap();
}