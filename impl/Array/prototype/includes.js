import indexOf from "sky-core/pure/Array/prototype/indexOf";
export function includes(search, start) {
	return indexOf.call(this, search, start) !== -1;
}