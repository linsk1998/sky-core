export function searchParams() {
	var searchParams = new SearchParams(this);
	Object.defineProperty(this, "searchParams", {
		enumerable: true,
		value: searchParams
	});
	return searchParams;
}