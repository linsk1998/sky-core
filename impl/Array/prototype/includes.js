import indexOf from "sky-core/pure/Array/prototype/indexOf";
export function includes(search, start) {
	return indexOf(this, search, start) !== -1;
}