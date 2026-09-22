export function getCSS(href, resolve, reject) {
	var link = document.createElement('LINK');
	link.href = href;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	if(resolve) {
		link.onload = function() {
			resolve();
		};
	}
	if(reject) {
		link.onerror = function(e) {
			reject(new Error("Fail to fetch CSS:" + this.href));
		};
	}
	document.head.appendChild(link);
	return link;
}