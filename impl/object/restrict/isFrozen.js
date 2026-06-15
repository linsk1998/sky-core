export function isFrozen(o) {
	if((typeof o === "object")) {
		if(o !== null) {
			return false;
		}
	}
	return true;
}