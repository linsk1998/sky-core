import { fix_Set$arg } from "./fix_Set$arg";
import { fixN0 } from "./fixN0";

export function fix_Set$v8(GSet) {
	var Set = fix_Set$arg(GSet);
	var set = new Set();
	// V8 ~ Chromium 42- fails only with 5+ elements
	var i = 5;
	while(i--) set.add(i);
	if(!set.has(-0)) {
		fixN0(Set);
	}
	return Set;
}
