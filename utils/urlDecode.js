export function urlDecode(str) {
	return str ? decodeURIComponent(str.replace(/\+/g, ' ')) : str;
}