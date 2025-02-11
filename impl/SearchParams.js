import "sky-core/polyfill/Array/prototype/forEach";

function SearchParams(url) {
	this.url = url;
};
SearchParams.prototype = Object.create(URLSearchParams.prototype);
["append", "set", "delete"].forEach(function(method) {
	this[method] = function(key, value) {
		var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
		searchParams[method].apply(searchParams, arguments);
		this.url.search = "?" + searchParams.toString();
	};
}, SearchParams.prototype);
["getAll", "get", "has", "toString", "forEach"].forEach(function(method) {
	this[method] = function(key, value) {
		var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
		return searchParams[method].apply(searchParams, arguments);
	};
}, SearchParams.prototype);
export { SearchParams };