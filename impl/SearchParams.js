import forEach from "sky-core/prue/Array/prototype/forEach";
function SearchParams(url) {
	this.url = url;
};
SearchParams.prototype = Object.create(URLSearchParams.prototype);
forEach.call(["append", "set", "delete"], function(method) {
	this[method] = function(key, value) {
		var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
		searchParams[method].apply(searchParams, arguments);
		this.url.search = "?" + searchParams.toString();
	};
}, SearchParams.prototype);
forEach.call(["getAll", "get", "has", "toString", "forEach"], function(method) {
	this[method] = function(key, value) {
		var searchParams = new URLSearchParams(this.url.search.replace(/^\?/, ""));
		return searchParams[method].apply(searchParams, arguments);
	};
}, SearchParams.prototype);
export { SearchParams };