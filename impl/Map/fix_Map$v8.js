import { fix_Map$arg } from "./fix_Map$arg";
import { fixN0 } from "./fixN0";

export function fix_Map$v8(GMap) {
	var Map = fix_Map$arg(GMap);
	var map = new Map();
	// V8 ~ Chromium 42- fails only with 5+ elements
	var i = 5;
	while(i--) map.set(i, 0);
	if(!map.has(-0)) {
		fixN0(Map);
	}
	return Map;
}
